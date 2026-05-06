import { Preset } from '@primeuix/themes/types';
import { ThemesName } from '../enums/Theme';

export interface ITheme {
  name: ThemesName;
  preset: Preset;
}
