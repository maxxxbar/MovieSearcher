import React, {FC, useCallback, useRef, useState} from 'react'
import ActionSheet from 'react-native-actions-sheet'
import {FilterItems, SearchTypes} from '../../entities/filter-items'
import {Text, View} from 'react-native'
import {Button, IconButton, TextInput} from 'react-native-paper'
import {Picker} from '@react-native-picker/picker'
import {
  customHeaderComponentStyles,
  movieFiltersStyles,
} from './movie-filters-styles'

interface CustomHeaderComponentProps {
  onClose: () => void
  onRefresh: () => void
}

interface MovieFiltersProps {
  callback: (item: FilterItems) => void
}

const INITIAL_FILTERS = {type: undefined, year: undefined}
export const MovieFilters: FC<MovieFiltersProps> = ({callback}) => {
  const actionSheetRef = useRef<ActionSheet>(null)
  const [pickerValue, setPickerValue] = useState<SearchTypes>()
  const [filterItem, setFilerItem] = useState<FilterItems>(INITIAL_FILTERS)
  const [year, setYear] = useState<string>()
  const onRefresh = useCallback(() => {
    setYear('')
    setPickerValue(undefined)
    setFilerItem(INITIAL_FILTERS)
  }, [])
  return (
    <>
      <Button
        mode={'outlined'}
        onPress={() => {
          actionSheetRef.current?.setModalVisible()
        }}>
        <Text>Filters</Text>
      </Button>
      <View style={movieFiltersStyles.actionSheetView}>
        <ActionSheet
          gestureEnabled={true}
          ref={actionSheetRef}
          onPositionChanged={() => {}}
          onClose={() => {
            callback(filterItem)
          }}
          CustomHeaderComponent={
            <CustomHeaderComponent
              onClose={() => actionSheetRef.current?.hide()}
              onRefresh={onRefresh}
            />
          }>
          <View>
            <Picker
              selectedValue={pickerValue}
              onValueChange={itemValue => {
                setPickerValue(itemValue)
                setFilerItem(prevState => {
                  return {...prevState, type: itemValue}
                })
              }}>
              <Picker.Item label="Select type" />
              <Picker.Item label="Movie" value={SearchTypes.MOVIE} />
              <Picker.Item label="Series" value={SearchTypes.SERIES} />
              <Picker.Item label="Episode" value={SearchTypes.EPISODE} />
            </Picker>
            <View>
              <TextInput
                mode={'outlined'}
                keyboardType={'number-pad'}
                placeholder={'Enter year'}
                value={year}
                onChangeText={(text: string) => {
                  const clearText = text.replace(/[^\d]/g, '')
                  setYear(clearText)
                  setFilerItem(prevState => {
                    return {...prevState, year: clearText}
                  })
                }}
              />
            </View>
          </View>
        </ActionSheet>
      </View>
    </>
  )
}

const CustomHeaderComponent: FC<CustomHeaderComponentProps> = ({
  onClose,
  onRefresh,
}) => (
  <View style={customHeaderComponentStyles.content}>
    <IconButton icon={'close'} onPress={onClose} />
    <View style={customHeaderComponentStyles.strip} />
    <IconButton icon={'autorenew'} onPress={onRefresh} />
  </View>
)
