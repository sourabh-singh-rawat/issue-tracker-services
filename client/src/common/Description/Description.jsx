/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import theme from '../../config/mui.config';

import CancelButton from '../CancelButton';
import SaveButton from '../SaveButton';
import TextField from '../TextField';

function Description({
  page,
  updateDescription,
  updateDescriptionQuery,
  isLoading,
}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateDescription({ description: e.target.value }));
  };

  const handleSave = async () => {
    if (page.description !== page.previousDescription) updateDescriptionQuery();

    dispatch(updateDescription({ descriptionSelected: false }));
  };

  return (
    <MuiGrid rowSpacing={1} container>
      <MuiGrid xs={12} item>
        <MuiTypography
          fontWeight={600}
          sx={{ color: theme.palette.grey[900] }}
          variant="body1"
        >
          Description:
        </MuiTypography>
        {page.descriptionSelected ? (
          <TextField
            inputProps={{
              style: { fontSize: '14px', lineHeight: 1.5 },
            }}
            minRows={4}
            size="small"
            value={page.description}
            autoFocus
            fullWidth
            multiline
            onChange={handleChange}
          />
        ) : (
          <>
            {isLoading ? (
              <>
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" width="20%" />
              </>
            ) : (
              <MuiTypography
                sx={{
                  lineHeight: 1.5,
                  padding: '8px 14px',
                  marginLeft: '-14px',
                  borderRadius: '6px',
                  color: 'text.primary',
                  transition: '250ms',
                  ':hover': { backgroundColor: 'action.hover' },
                }}
                variant="body2"
                onClick={() => {
                  dispatch(
                    updateDescription({
                      descriptionSelected: true,
                      previousDescription: page.description,
                    }),
                  );
                }}
              >
                {page.description ? page.description : 'Add a description...'}
              </MuiTypography>
            )}
          </>
        )}
      </MuiGrid>
      {page.descriptionSelected && (
        <MuiGrid sm={12} item>
          <MuiGrid spacing={1} container>
            <MuiGrid item>
              <SaveButton label="Save" onClick={handleSave} />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton
                label="Cancel"
                onClick={() =>
                  dispatch(
                    updateDescription({
                      descriptionSelected: false,
                      description: page.previousDescription,
                    }),
                  )
                }
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default Description;
