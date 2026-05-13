import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';

export interface ITheme {
  name: Theme;
  preset: Preset;
}
