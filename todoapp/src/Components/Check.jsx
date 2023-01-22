import styled from "styled-components";

const Checkbox = ({ label, isChecked, handleChange }) => {
  return (
    <StyledCheckbox>
      <div class="round">
        <input
          type="checkbox"
          id="checkbox"
          value={isChecked}
          onChange={(e) => handleChange(e)}
        />
        <label for="checkbox"></label>
      </div>
    </StyledCheckbox>
  );
};
export default Checkbox;
const StyledCheckbox = styled.div`
  .round {
    position: relative;
    width: 24px;
    height: 24px;
  }

  .round label {
    border: 1px solid #f07ea9;
    border-radius: 50%;
    cursor: pointer;
    height: 24px;
    left: 0;
    position: absolute;
    top: 0;
    width: 24px;
  }

  .round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 4px;
    opacity: 0;
    position: absolute;
    top: 6px;
    transform: rotate(-45deg);
    width: 12px;
    transition: all 0.4s ease;
  }

  .round input[type="checkbox"] {
    visibility: hidden;
  }

  .round input[type="checkbox"]:checked + label {
    background-color: #f07ea9;
    border-color: #f07ea9;
  }

  .round input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`;
