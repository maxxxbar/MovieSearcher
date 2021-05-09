import React, {FC, ReactNode} from 'react'
import {Snackbar} from 'react-native-paper'

interface SnackBarProjectProps {
  onDismiss: () => void
  visible: boolean
  children: ReactNode
  duration?: number
}

const DEFAULT_DURATION = 10000
export const SnackBarProject: FC<SnackBarProjectProps> = props => {
  return (
    <Snackbar
      {...props}
      duration={props.duration ? props.duration : DEFAULT_DURATION}
      action={{
        label: 'OK',
        onPress: props.onDismiss,
      }}
    />
  )
}
