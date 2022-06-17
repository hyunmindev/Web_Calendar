import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  div:nth-child(6) {
    background-color: rgba(0, 0, 255, 0.1);
  }
  div:nth-child(7) {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;

function Row({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
