import React, { useState, createRef, useCallback } from 'react';
import Link from 'next/link';
import CustomInput from '../shared/CustomInput';
import CustomButton from '../shared/CustomButton';
import Section from '../layouts/Section/Section';

const About = () => {
  const [value, setValue] = useState('');
  const inputRef = createRef();
  const buttonRef = createRef();

  const handleChange = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    },
    [],
  );

  const handleClick = useCallback(
    () => {
      console.log('value :', value);
    },
    [value],
  );

  return (
    <Section>
      <Link href="/">
        <a title="home">Home</a>
      </Link>
      <p>About</p>
      <CustomInput
        ref={inputRef}
        value={value}
        onChange={handleChange}
      />
      <CustomButton
        ref={buttonRef}
        onClick={handleClick}
      >
        <span>Click</span>
      </CustomButton>
    </Section>
  );
};

export default About;
