/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function handleOpenPicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        mode: 'spinner',
        date,
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);

        onChange(selectedDate);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  );
}
