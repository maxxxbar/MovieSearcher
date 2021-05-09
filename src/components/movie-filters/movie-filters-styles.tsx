import React from 'react'
import {StyleSheet} from 'react-native'

export const movieFiltersStyles = StyleSheet.create({
  actionSheetView: {flexDirection: 'row', justifyContent: 'center'},
})

export const customHeaderComponentStyles = StyleSheet.create({
  content: {flexDirection: 'row', justifyContent: 'space-between'},
  strip: {
    height: 6,
    width: 45,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    alignSelf: 'center',
  },
})
