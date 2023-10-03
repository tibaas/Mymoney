import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

//extender a typagem que o styled já tem e não sobrescrever  ela por isso importar no começo
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
