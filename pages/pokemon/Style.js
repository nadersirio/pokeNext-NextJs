import styled from 'styled-components'

export const Background = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({type}) =>
    type === 'fire' && 'url(/images/Box_Volcano_E_1500.png)' ||
    type === 'water' && 'url(/images/Box_Seafloor_E_1500.png)' ||
    type === 'grass' &&  'url(/images/Box_Forest_E_1500.png)' ||
    type === 'flying' && 'url(/images/Box_Sky_E_1500.png)' ||
    type === 'bug' && 'url(/images/Box_Forest_B_1500.png)' ||
    'url(/images/Box_Savanna_E_1500.png)'
  };
  background-color: #707080;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;