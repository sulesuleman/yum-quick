export const colors = {
  /** Background / surface tokens */
  background: {
    /** yellowBase: F5CB58 */
    yellowBase: '#F5CB58',
    /** yellow2: F3E9B5 */
    yellow2: '#F3E9B5',
    /** orangeBase: E95322 */
    orangeBase: '#E95322',
    /** orange2: FFDECF */
    orange2: '#FFDECF',
    card: '#FFFFFF',
    divider: '#FFD8C7'
  },

  /** Button-specific mappings built on top of base tokens */
  button: {
    primary: '#F5CB58', // yellowBase
    signUp: '#F3E9B5' // yellow2
  },

  /** Brand / accent colors */
  brand: {
    primary: '#E95322', // orangeBase
    secondary: '#FFDECF' // orange2
  },

  /** Text colors */
  text: {
    /** font1: 391713 */
    primary: '#391713',
    /** font2: F8F8F8 */
    inverse: '#F8F8F8',
    placeholder: '#676767',
    caption: '#070707'
  }
} as const;
