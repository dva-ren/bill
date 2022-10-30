import type { ExtractPropTypes } from 'vue'

export const popupProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 40,
  },
}

export type PopupProps = ExtractPropTypes<typeof popupProps>
