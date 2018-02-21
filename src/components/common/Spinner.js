import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
  });

export { Spinner };
