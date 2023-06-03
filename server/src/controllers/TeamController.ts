const createMember = async (req: any, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const teamUser = (await TeamUser.insertOne({ ...req.body, team_id: id }))
  //     .rows[0];
  //   res.send(teamUser);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const create = async (req: any, res: Response) => {
  // try {
  //   const { uid } = req.user;
  //   const { name, description } = req.body;
  //   const { id } = await User.findOne(uid);
  //   const team = (await Team.insertOne({ name, description, team_leader: id }))
  //     .rows[0];
  //   return res.send(team);
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const indexMembers = async (req: any, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const teamMembers = (await TeamUser.find(id)).rows;
  //   return res.send(teamMembers);
  // } catch (error) {
  //   return res.stats(500).send();
  // }
};

const index = async (req: any, res: Response) => {
  // try {
  //   const teams = (await Team.find()).rows;
  //   return res.send({ rows: teams, rowCount: 0 });
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const show = async (req: any, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const team = (await Team.findOne(id)).rows[0];
  //   if (!team) res.status(404).send();
  //   return res.send(team);
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const update = async (req: any, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const team = (await Team.updateOne(id, req.body)).rows[0];
  //   if (!team) res.status(404).send();
  //   return res.send(team);
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const TeamController = {
  create,
  createMember,
  index,
  indexMembers,
  show,
  update,
};

export default TeamController;
