import $ from 'jquery';
import svg4everybody from 'svg4everybody';

/*
 * Common scripts
 */

const initSvg4everybody = () => {
  svg4everybody();
};

/*
 * Other scriptss
 */

$(document).ready(() => {
  initSvg4everybody();
});

$(window).on('load', () => {});
