
import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'; // Importa la función correcta para tu caso

import icoMoonConfig from '../../selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const CustomIcon = ({ name, size, color }: any) => {
    return <Icon name={name} size={size} color={color} />;
};

export default CustomIcon;
