/**
 * Pine custom oxlint rules.
 *
 * Prefer assigning React Query hooks to a variable and reading properties:
 *   const projectQuery = useFindProjectQuery(...)
 *   projectQuery.data
 *
 * Never destructure query/mutation hook results:
 *   const { data } = useFindProjectQuery(...) // ban
 *   const { mutateAsync } = useCreateIssueMutation() // ban
 */

/** @param {unknown} node */
function unwrapExpression(node) {
  let current = node;
  while (
    current &&
    (current.type === "ParenthesizedExpression" ||
      current.type === "TSAsExpression" ||
      current.type === "TSSatisfiesExpression" ||
      current.type === "TSNonNullExpression" ||
      current.type === "ChainExpression")
  ) {
    current = current.expression ?? current.argument;
  }
  return current;
}

/** @param {unknown} callee */
function getCalleeName(callee) {
  if (!callee) return null;
  if (callee.type === "Identifier") return callee.name;
  if (callee.type === "MemberExpression" && !callee.computed) {
    const prop = callee.property;
    if (prop?.type === "Identifier") return prop.name;
  }
  return null;
}

/**
 * React Query / codegen hooks: useXQuery, useXMutation, useQuery, useMutation, …
 * Excludes MUI useMediaQuery and similar non-RQ *Query helpers.
 */
const NON_RQ_QUERY_HOOKS = new Set(["useMediaQuery"]);

/** @param {string | null} name */
function isQueryOrMutationHook(name) {
  if (!name || !name.startsWith("use")) return false;
  if (NON_RQ_QUERY_HOOKS.has(name)) return false;

  if (
    name === "useQuery" ||
    name === "useMutation" ||
    name === "useSuspenseQuery" ||
    name === "useSuspenseMutation" ||
    name === "useInfiniteQuery" ||
    name === "useQueries"
  ) {
    return true;
  }

  return /Query$/.test(name) || /Mutation$/.test(name);
}

const MESSAGE =
  "Do not destructure React Query hooks. Assign the result to a variable and use properties (e.g. `const projectQuery = useFindProjectQuery(...); projectQuery.data`).";

const noDestructureQueryMutation = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow destructuring the return value of React Query / generated use*Query and use*Mutation hooks",
    },
    schema: [],
    messages: {
      noDestructure: MESSAGE,
    },
  },
  create(context) {
    /**
     * @param {import('estree').Node} pattern
     * @param {import('estree').Node | null | undefined} init
     */
    function check(pattern, init) {
      if (!pattern || pattern.type !== "ObjectPattern") return;
      const call = unwrapExpression(init);
      if (!call || call.type !== "CallExpression") return;
      const name = getCalleeName(call.callee);
      if (!isQueryOrMutationHook(name)) return;

      context.report({
        node: pattern,
        messageId: "noDestructure",
      });
    }

    return {
      VariableDeclarator(node) {
        check(node.id, node.init);
      },
      AssignmentExpression(node) {
        check(node.left, node.right);
      },
    };
  },
};

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: "pine",
  },
  rules: {
    "no-destructure-query-mutation": noDestructureQueryMutation,
  },
};

export default plugin;
