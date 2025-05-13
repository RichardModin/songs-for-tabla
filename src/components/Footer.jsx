import {
  Fab, Grid, Box, IconButton
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Add, Close } from '@mui/icons-material';
import allBols from '../bols';
import BolButton from './BolButton';
import AppVersion from "./AppVersion.jsx";

function Footer(props) {
  const {
    editingIndex, syllables, setSyllables, setEditingIndex, toggleOpenCallback, isOpen,
  } = props;

  return (
    <>
      {/* Floating Button */}
      <Fab
        aria-label="open bols"
        onClick={toggleOpenCallback}
        size="small"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          display: isOpen ? 'none' : '',
        }}
      >
        <Add />
      </Fab>

      {/* Sliding Panel (only visible when isOpen is true) */}
      {isOpen && (
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: 'background.paper',
          borderTop: '1px solid white',
          p: 2,
          zIndex: 999,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <AppVersion />
            <IconButton onClick={toggleOpenCallback} size="small">
              <Close />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {Object.keys(allBols).map((hand) => {
              const key = `bol-${hand}`;
              return (
                <Grid item xs={6} sm={4} key={key} textAlign="center">
                  {Object.keys(allBols[hand].bols).map((bols) => {
                    const { title: bolTitle } = allBols[hand].bols[bols];
                    const bolKey = `${hand}-${bols}`;
                    return (
                      <BolButton
                        title={bolTitle}
                        key={bolKey}
                        hand={hand}
                        onClick={() => {
                          if (editingIndex !== -1) {
                            const newSyllables = syllables.map((syllable, i) => {
                              if (i === editingIndex) {
                                return bolTitle;
                              }
                              return syllable;
                            });
                            setSyllables(newSyllables);
                            setEditingIndex(-1);
                          } else {
                            setSyllables([...syllables, bolTitle]);
                          }
                          // Optionally close the panel after selection
                          // setIsOpen(false);
                        }}
                      />
                    );
                  })}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
}

Footer.propTypes = {
  editingIndex: PropTypes.number.isRequired,
  syllables: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSyllables: PropTypes.func.isRequired,
  setEditingIndex: PropTypes.func.isRequired,
  toggleOpenCallback: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Footer;