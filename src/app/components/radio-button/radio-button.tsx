import React from 'react';
import styled from 'styled-components';

interface Props {
  citylist: { name: string; id: string }[];
  onSelect: (id:string) => void;
}

const RadioInput = styled.div`
  --container_width: 250px;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #212121;
  color: #fff;
  width: var(--container_width);
  overflow: hidden;
  border: 2px solid #fff;
`;

const Label = styled.label`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  font-weight: 600;
  letter-spacing: -1px;
  font-size: 14px;

  input {
    display: none;
  }

  &:has(input:checked) {
    color: #000;
  }
`;

const Selection = styled.span<{ count: number }>`
  display: none;
  position: absolute;
  height: 100%;
  width: calc(var(--container_width) / ${(props) => props.count});
  z-index: 0;
  left: 0;
  top: 0;
  transition: 0.15s ease;
  background-color: #ffe500;

  ${(props) =>
    [...Array(props.count)].map(
      (_, index) => `
      label:nth-child(${index + 1}):has(input:checked) ~ & {
        display: inline-block;
        transform: translateX(calc(var(--container_width) * ${index} / ${props.count}));
      }
    `
    )}
`;

export default function RadioButton(props: Props) {
  const { citylist } = props;

  return (
    <RadioInput>
      {citylist.map((city) => (
        <Label key={city.id}>
          <input value={city.id} name="value-radio" id={city.id} type="radio" onClick={() => props.onSelect(city.id)}/>
          <span>{city.name}</span>
        </Label>
      ))}
      <Selection count={citylist.length} />
    </RadioInput>
  );
}
