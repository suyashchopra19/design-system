import React from 'react'
import styled, { withTheme } from 'styled-components'
import { BoxChecked, BoxEmpty } from 'pcln-icons'
import PropTypes from 'prop-types'
import Box from './Box'
import { applyVariations, getPaletteColor, deprecatedColorValue } from './utils'

const Checkbox = props => {
  const { disabled, size } = props

  // Add 4px to Icon's height and width to account for size reduction caused by adding padding to SVG element
  const borderAdjustedSize = size + 4

  return (
    <CheckBoxWrapper
      theme={props.theme}
      color={props.color}
      disabled={disabled}
    >
      <StyledInput type="checkbox" {...props} role="checkbox" />
      <BoxChecked size={borderAdjustedSize} data-name="checked" />
      <BoxEmpty size={borderAdjustedSize} data-name="empty" />
    </CheckBoxWrapper>
  )
}

const CheckBoxWrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  position: relative;
  vertical-align: middle;
  padding: 2px;
  cursor: pointer;
  background-color: inherit;
  color: ${props =>
    props.disabled
      ? getPaletteColor('border.base')(props)
      : getPaletteColor('border.light')(props)};

  svg {
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 2px;
  }

  svg[data-name='checked'] {
    display: none;
  }
  
  > input:hover ~ svg[data-name='empty'] {
    color: ${props =>
      props.disabled
        ? getPaletteColor('border.base')(props)
        : getPaletteColor('base')(props)};
      }
  }
  
  > input {
    &:focus ~ svg {
      border: 1px solid ${getPaletteColor('border.base')};
      background-color: ${getPaletteColor('background.light')};
    }
  }

  > input:checked {
    & ~ svg[data-name='checked'] {
      display: inline-block;
      color: ${props =>
        props.disabled
          ? getPaletteColor('border.base')(props)
          : getPaletteColor('base')(props)};
    }

    & ~ svg[data-name='empty'] {
      display: none;
    }
    
    &:focus ~ svg {
      border: 1px solid ${getPaletteColor('base')};
      background-color: ${getPaletteColor('light')};
    }

    &:hover ~ svg[data-name='checked'] {
      color: ${props =>
        props.disabled
          ? props.theme.colors.borderGray
          : props.theme.colors.darkBlue};
        }
  }

  ${applyVariations('Checkbox')}
`

const StyledInput = styled.input`
  appearance: none;
  opacity: 0;
  position: absolute;
  z-index: 0;
`

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  color: deprecatedColorValue()
}

Checkbox.defaultProps = {
  size: 20,
  color: 'primary'
}

export default withTheme(Checkbox)
