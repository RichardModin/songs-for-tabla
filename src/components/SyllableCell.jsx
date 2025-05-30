import React, { useState } from 'react';
import {
  ButtonGroup, Grid, IconButton, Typography, useTheme,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import PropTypes from 'prop-types';
import findHandForSyllable from '../find-hand-for-syllable';

function SyllableCell({
  syllable, onDelete, onEdit, isEditing, isPlaying, size = 1,
}) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const getColor = () => {
    try {
      const hand = findHandForSyllable(syllable);
      switch (hand) {
        case 'rightHand':
          return theme.palette.success.main;
        case 'leftHand':
          return theme.palette.primary.main;
        case 'bothHands':
          return theme.palette.secondary.main;
        default:
          return theme.palette.info.main;
      }
    } catch (e) {
      console.error('Error finding hand for syllable:', e);
      return 'inherit';
    }
  };

  const style = {
    border: '2px dotted black',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 0,
    position: 'relative',
    color: getColor(),
  };

  if (isEditing) {
    style.color = theme.palette.warning.main;
  }

  if (isPlaying) {
    style.color = theme.palette.text.primary;
    style.borderColor = theme.palette.text.primary;
  } else {
    style.borderColor = '#343434';
  }

  return (
    <Grid
      item
      xs={size}
      style={style}
      onMouseOver={() => { setHover(true); }}
      onMouseOut={() => { setHover(false); }}
      textAlign="center"
    >
      {hover && (
      <ButtonGroup
        variant="contained"
        aria-label="Edit Controls"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <IconButton aria-label="delete" size="small" onClick={onDelete}>
          <Delete fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="edit" size="small" onClick={onEdit}>
          <Edit fontSize="inherit" />
        </IconButton>
      </ButtonGroup>
      )}
      <Typography variant="h4">
        {syllable}
      </Typography>
    </Grid>
  );
}

SyllableCell.propTypes = {
  syllable: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

SyllableCell.defaultProps = {
  size: 1,
};

export default SyllableCell;
