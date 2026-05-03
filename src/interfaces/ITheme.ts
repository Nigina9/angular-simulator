import { Preset } from '@primeuix/themes/types';
import { ThemesName } from '../enums/Themes';

export interface ITheme {
  name: ThemesName;
  preset: Preset;
}