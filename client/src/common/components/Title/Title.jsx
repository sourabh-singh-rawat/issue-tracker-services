/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import CancelButton from '../CancelButton';
import SaveButton from '../SaveButton';
import TextField from '../TextField';

const TitleTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    overflow: 'hidden',
    paddingTop: '4px',
    paddingBottom: '4px',
    textOverflow: 'ellipsis',
  },
  '& .MuiOutlinedInput-root ': {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    '& fieldset': {
      border: '2px solid transparent',
      borderRadius: '6px',
    },
    '&:hover': {
      transitionDuration: '250ms',
      backgroundColor: theme.palette.grey[1200],
      '& fieldset': {
        border: `2px solid ${theme.palette.grey[1200]}`,
        transitionDuration: '250ms',
      },
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.common.white,
      transitionDuration: '250ms',
      '& fieldset': {
        border: `2px solid ${theme.palette.primary[900]}`,
        transitionDuration: '250ms',
      },
    },
  },
}));

function Title({ page, updateTitle, updateTitleQuery }) {
  const dispatch = useDispatch();
  const { nameSelected } = page;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateTitle({ [name]: value }));
  };

  const handleSave = () => {
    if (page.name !== page.previousName) updateTitleQuery();
    dispatch(updateTitle({ nameSelected: false }));
  };

  return (
    <MuiGrid
      columnSpacing={1}
      sx={{ marginLeft: '-24px', marginBottom: '4px' }}
      container
    >
      <MuiGrid flexGrow={1} item>
        <TitleTextField
          name="name"
          value={page.name}
          fullWidth
          onChange={handleChange}
          onClick={() =>
            dispatch(
              updateTitle({ previousName: page.name, nameSelected: true }),
            )
          }
        />
      </MuiGrid>
      {nameSelected && (
        <MuiGrid item>
          <SaveButton label="Save" onClick={handleSave} />
        </MuiGrid>
      )}
      {nameSelected && (
        <MuiGrid item>
          <CancelButton
            label="Cancel"
            onClick={() => {
              dispatch(
                updateTitle({ name: page.previousName, nameSelected: false }),
              );
            }}
          />
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default Title;
