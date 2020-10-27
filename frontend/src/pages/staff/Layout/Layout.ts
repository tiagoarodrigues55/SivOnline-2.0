import styled from 'styled-components'



// VD - Video
// SL - SpeechesList
// NS - News
// At - Actions
// CH - Chat
// VT - Votes
// DC - Docs

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 700px auto;
  grid-template-rows: 240px 220px 160px auto;
  grid-template-areas:
   
  
  'CC CH '
  'CC CH '
  'AD AD '
  'AD AD '
  
  ;
  
  height: 100vh;
`;