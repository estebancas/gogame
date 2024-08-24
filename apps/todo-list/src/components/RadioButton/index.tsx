import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

type Props = {
  checked: boolean;
  label: string;
  onPress: (checked: boolean) => void;
};

export const RadioButton = ({ label, checked, onPress }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleOnPress = () => {
    setIsChecked((prev) => {
      const status = !prev;
      onPress(status);
      return status;
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <View style={[styles.radio, isChecked && styles.radioOn]} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};
