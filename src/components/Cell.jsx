import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border: 1px solid #cccccc;
`;

function Cell({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Cell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Cell;
