import { describe, expect, test } from 'vitest';
import { delocalize } from '../lib/delocalize.ts';

describe('delocalize', () => {
  test('english', () => {
    const opts = 'en';
    expect(delocalize('YY-MM-DD HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');

    expect(delocalize('#,##0.00', opts)).toBe('#,##0.00');
    expect(delocalize('#.##0,00', opts)).toBe('#.##0,00');

    expect(delocalize('[color7]0', opts)).toBe('[color7]0');
    expect(delocalize('[color 7]0', opts)).toBe('[color 7]0');
    expect(delocalize('[black]0', opts)).toBe('[black]0');
    expect(delocalize('[blue]0', opts)).toBe('[blue]0');
    expect(delocalize('[cyan]0', opts)).toBe('[cyan]0');
    expect(delocalize('[green]0', opts)).toBe('[green]0');
    expect(delocalize('[magenta]0', opts)).toBe('[magenta]0');
    expect(delocalize('[red]0', opts)).toBe('[red]0');
    expect(delocalize('[white]0', opts)).toBe('[white]0');
    expect(delocalize('[yellow]0', opts)).toBe('[yellow]0');

    expect(delocalize('0 $', opts)).toBe('0 $');

    // collapsing strings & chars works as expected
    expect(delocalize('0.0 foo"bar"."b"az', opts)).toBe('0.0 "foobar.baz"');
    expect(delocalize('0.0 foo"bar".xxx', opts)).toBe('0.0 "foobar.xxx"');
    expect(delocalize('0 \\y\\ear\\s', opts)).toBe('0 "years"');
    expect(delocalize('xx_(xx', opts)).toBe('"xx"_("xx"');
    expect(delocalize('xx*(xx', opts)).toBe('"xx"*("xx"');
    expect(delocalize('"x"\\""x"', opts)).toBe('"x"\\""x"');
    expect(delocalize('x\\"x', opts)).toBe('"x"\\""x"');
  });

  test('english, UK', () => {
    const opts = 'en-GB';
    expect(delocalize('YY-MM-DD HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');

    expect(delocalize('#,##0.00', opts)).toBe('#,##0.00');
    expect(delocalize('#.##0,00', opts)).toBe('#.##0,00');

    expect(delocalize('[Colour7]0', opts)).toBe('[Color7]0');
    expect(delocalize('[Colour 7]0', opts)).toBe('[Color 7]0');
    expect(delocalize('[Black]0', opts)).toBe('[Black]0');
    expect(delocalize('[Blue]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Cyan]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Green]0', opts)).toBe('[Green]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Red]0', opts)).toBe('[Red]0');
    expect(delocalize('[White]0', opts)).toBe('[White]0');
    expect(delocalize('[Yellow]0', opts)).toBe('[Yellow]0');
  });

  test('german', () => {
    const opts = 'de';
    expect(delocalize('JJ-MM-TT HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');

    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    expect(delocalize('Standard', opts)).toBe('General');

    expect(delocalize('[Color7]0', opts)).toBe('[Color7]0');
    expect(delocalize('[Schwarz]0', opts)).toBe('[Black]0');
    expect(delocalize('[Blau]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Cyan]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Grün]0', opts)).toBe('[Green]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Rot]0', opts)).toBe('[Red]0');
    expect(delocalize('[Weiß]0', opts)).toBe('[White]0');
    expect(delocalize('[Gelb]0', opts)).toBe('[Yellow]0');

    // swiss german: group: "'", decimal: '.'
    const opts2 = 'de-CH';
    expect(delocalize('#,##0.00', opts2)).toBe('#,##0.00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    expect(delocalize('#’##0.00', opts2)).toBe('#,##0.00');
    expect(delocalize('#\'##0.00', opts2)).toBe('#,##0.00');
    expect(delocalize('$ #’##0;$ -#’##0', opts2)).toBe('$ #,##0;$ -#,##0');
    expect(delocalize('CHF #’##0;CHF -#’##0', opts2)).toBe('"CHF" #,##0;"CHF" -#,##0');
  });

  test('dutch', () => {
    const opts = 'nl';
    expect(delocalize('JJ-MM-DD UU:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    expect(delocalize('[U]', opts)).toBe('[H]');
    expect(delocalize('[UUU]', opts)).toBe('[H]');
    expect(delocalize('Standaard', opts)).toBe('General');

    expect(delocalize('[Zwart]0', opts)).toBe('[Black]0');
    expect(delocalize('[Blauw]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Cyaan]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Groen]0', opts)).toBe('[Green]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Root]0', opts)).toBe('[Red]0');
    expect(delocalize('[Wit]0', opts)).toBe('[White]0');
    expect(delocalize('[Geel]0', opts)).toBe('[Yellow]0');
  });

  test('danish', () => {
    const opts = 'da';
    expect(delocalize('ÅÅ-MM-DD TT:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');

    expect(delocalize('_-* #.##0 kr._-;-* #.##0 kr._-;_-* "-" kr._-;_-@_-', opts))
      .toBe('_-* #,##0 "kr."_-;-* #,##0 "kr."_-;_-* "-" "kr."_-;_-@_-');
    expect(delocalize('#.##0 kr.;[Red]-#.##0 kr.', opts))
      .toBe('#,##0 "kr.";[Red]-#,##0 "kr."');

    expect(delocalize('Standard', opts)).toBe('General');
    expect(delocalize('[Farve 7]0', opts)).toBe('[Color 7]0');
    expect(delocalize('[Sort]0', opts)).toBe('[Black]0');
    expect(delocalize('[Blå]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Akvamarin]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Lysegrøn]0', opts)).toBe('[Green]0');
    expect(delocalize('[Lyslilla]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Rød]0', opts)).toBe('[Red]0');
    expect(delocalize('[Hvid]0', opts)).toBe('[White]0');
    expect(delocalize('[Gul]0', opts)).toBe('[Yellow]0');

    expect(delocalize('#.##0,00 "Kr"', opts)).toBe('#,##0.00 "Kr"');
    expect(delocalize('#.##0,00 "sikrer"', opts)).toBe('#,##0.00 "sikrer"');
    expect(delocalize('#.##0,00 "siKrer"', opts)).toBe('#,##0.00 "siKrer"');
    expect(delocalize('#.##0,00 "si Kr er"', opts)).toBe('#,##0.00 "si Kr er"');
    expect(delocalize('#.##0,00 \\si Kr \\er', opts)).toBe('#,##0.00 "si" "Kr" "er"');
    expect(delocalize('#.##0,00 \\siKr\\er', opts)).toBe('#,##0.00 "siKrer"');
    expect(delocalize('#.##0,00 lKrl', opts)).toBe('#,##0.00 "lKrl"');
    expect(delocalize('#.##0,00 \\lKr\\l', opts)).toBe('#,##0.00 "lKrl"');
    expect(delocalize('#.##0,00 "l"Kr"l"', opts)).toBe('#,##0.00 "lKrl"');
  });

  test('swedish', () => {
    const opts = 'sv';
    expect(delocalize('ÅÅ-MM-DD TT:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    expect(delocalize('Standard', opts)).toBe('General');
    expect(delocalize('[Färg 7]0', opts)).toBe('[Color 7]0');
    expect(delocalize('[Svart]0', opts)).toBe('[Black]0');
    expect(delocalize('[Blå]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Cyanblå]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Grön]0', opts)).toBe('[Green]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Röd]0', opts)).toBe('[Red]0');
    expect(delocalize('[Vit]0', opts)).toBe('[White]0');
    expect(delocalize('[Gul]0', opts)).toBe('[Yellow]0');
  });

  test('norwegian', () => {
    {
      const opts = 'no';
      expect(delocalize('ÅÅ-MM-DD TT:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
      expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
      expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');

      expect(delocalize('Standard', opts)).toBe('General');
      expect(delocalize('[Farge 7]0', opts)).toBe('[Color 7]0');
      expect(delocalize('[Svart]0', opts)).toBe('[Black]0');
      expect(delocalize('[Blå]0', opts)).toBe('[Blue]0');
      expect(delocalize('[Cyan]0', opts)).toBe('[Cyan]0');
      expect(delocalize('[Grønn]0', opts)).toBe('[Green]0');
      expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
      expect(delocalize('[Rød]0', opts)).toBe('[Red]0');
      expect(delocalize('[Hvit]0', opts)).toBe('[White]0');
      expect(delocalize('[Gul]0', opts)).toBe('[Yellow]0');
    }
    {
      const opts = 'nb';
      expect(delocalize('åå-MM-DD TT:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
      expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
      expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    }
  });

  test('finnish', () => {
    const opts = 'fi';
    expect(delocalize('VV-KK-PP TT:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    // XXX: need to confirm that colors are in english
  });

  test('french', () => {
    const opts = 'fr';
    expect(delocalize('AA-MM-JJ HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
    expect(delocalize('ooo', opts)).toBe('AAA');

    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');

    expect(delocalize('[Color7]0', opts)).toBe('[Color7]0');
    expect(delocalize('[Noir]0', opts)).toBe('[Black]0');
    expect(delocalize('[Bleu]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Cyan]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Vert]0', opts)).toBe('[Green]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Rouge]0', opts)).toBe('[Red]0');
    expect(delocalize('[Blanc]0', opts)).toBe('[White]0');
    expect(delocalize('[Jaune]0', opts)).toBe('[Yellow]0');

    expect(delocalize('_ * # ##0_)_ ;_ * (# ##0)_ ;_ * "-"_)_ ;_ @_ ', opts))
      .toBe('_ * #,##0_)_ ;_ * (#,##0)_ ;_ * "-"_)_ ;_ @_ ');
    expect(delocalize('# ##0,0 "Fr"', opts)).toBe('#,##0.0 "Fr"');
  });

  test('spanish', () => {
    const opts = 'es';
    expect(delocalize('AA-MM-DD HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');

    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');

    expect(delocalize('[Color7]0', opts)).toBe('[Color7]0');
    expect(delocalize('[Negro]0', opts)).toBe('[Black]0');
    expect(delocalize('[Blanco]0', opts)).toBe('[White]0');
    expect(delocalize('[Rojo]0', opts)).toBe('[Red]0');
    expect(delocalize('[Verde]0', opts)).toBe('[Green]0');
    expect(delocalize('[Azul]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Amarillo]0', opts)).toBe('[Yellow]0');
    expect(delocalize('[Cian]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Ciano]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
  });

  test('italian', () => {
    const opts = 'it';
    expect(delocalize('AA-MM-GG HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');
    expect(delocalize('ooo', opts)).toBe('AAA');
    expect(delocalize('xxx', opts)).toBe('GGG');

    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');

    expect(delocalize('[Color7]0', opts)).toBe('[Color7]0');
    expect(delocalize('[Nero]0', opts)).toBe('[Black]0');
    expect(delocalize('[Bianco]0', opts)).toBe('[White]0');
    expect(delocalize('[Rosso]0', opts)).toBe('[Red]0');
    expect(delocalize('[Verde]0', opts)).toBe('[Green]0');
    expect(delocalize('[Blu]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Giallo]0', opts)).toBe('[Yellow]0');
    expect(delocalize('[Ciano]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Celeste]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
  });

  test('portuguese', () => {
    const opts = 'pt';
    expect(delocalize('AA-MM-DD HH:MM:SS', opts)).toBe('YY-MM-DD HH:MM:SS');

    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');
    expect(delocalize('#\u202f##0,00', opts)).toBe('#,##0.00');
    expect(delocalize('# ##0,00', opts)).toBe('#,##0.00');

    expect(delocalize('Estandar "Estandar"', opts)).toBe('General "Estandar"');

    expect(delocalize('[Color7]0', opts)).toBe('[Color7]0');

    expect(delocalize('[Preto]0', opts)).toBe('[Black]0');
    expect(delocalize('[Branco]0', opts)).toBe('[White]0');
    expect(delocalize('[Vermelho]0', opts)).toBe('[Red]0');
    expect(delocalize('[Verde]0', opts)).toBe('[Green]0');
    expect(delocalize('[Azul]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Amarelo]0', opts)).toBe('[Yellow]0');
    expect(delocalize('[Ciano]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Turquesa]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Magenta]0', opts)).toBe('[Magenta]0');
  });

  test('russian', () => {
    const opts = 'ru';
    expect(delocalize('#,##0.00', opts)).toBe('#.##0,00');
    expect(delocalize('#.##0,00', opts)).toBe('#,##0.00');

    expect(delocalize('[Color7]0', opts)).toBe('[Color7]0');
    expect(delocalize('[Цвет7]0', opts)).toBe('[Color7]0');

    expect(delocalize('[Черный]0', opts)).toBe('[Black]0');
    expect(delocalize('[Белый]0', opts)).toBe('[White]0');
    expect(delocalize('[Красный]0', opts)).toBe('[Red]0');
    expect(delocalize('[Зеленый]0', opts)).toBe('[Green]0');
    expect(delocalize('[Синий]0', opts)).toBe('[Blue]0');
    expect(delocalize('[Желтый]0', opts)).toBe('[Yellow]0');
    expect(delocalize('[Голубой]0', opts)).toBe('[Cyan]0');
    expect(delocalize('[Пурпурный]0', opts)).toBe('[Magenta]0');
    expect(delocalize('[Фиолетовый]0', opts)).toBe('[Magenta]0');
  });
});
