goog.provide('ol.source.Stamen');

goog.require('ol.Attribution');
goog.require('ol.source.XYZ');


/**
 * @type {Object.<string, {extension: string, opaque: boolean}>}
 */
ol.source.StamenLayerConfig = {
  'terrain': {
    extension: 'jpg',
    opaque: true
  },
  'terrain-background': {
    extension: 'jpg',
    opaque: true
  },
  'terrain-labels': {
    extension: 'png',
    opaque: false
  },
  'terrain-lines': {
    extension: 'png',
    opaque: false
  },
  'toner-background': {
    extension: 'png',
    opaque: true
  },
  'toner': {
    extension: 'png',
    opaque: true
  },
  'toner-hybrid': {
    extension: 'png',
    opaque: false
  },
  'toner-labels': {
    extension: 'png',
    opaque: false
  },
  'toner-lines': {
    extension: 'png',
    opaque: false
  },
  'toner-lite': {
    extension: 'png',
    opaque: true
  },
  'watercolor': {
    extension: 'jpg',
    opaque: true
  }
};


/**
 * @type {Object.<string, {minZoom: number, maxZoom: number}>}
 */
ol.source.StamenProviderConfig = {
  'terrain': {
    minZoom: 4,
    maxZoom: 18
  },
  'toner': {
    minZoom: 0,
    maxZoom: 20
  },
  'watercolor': {
    minZoom: 3,
    maxZoom: 16
  }
};


/**
 * @const {Array.<ol.Attribution>}
 */
ol.source.STAMEN_ATTRIBUTIONS = [new ol.Attribution(
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under ' +
    '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
    'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ' +
    '<a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.')];



/**
 * @constructor
 * @extends {ol.source.XYZ}
 * @param {ol.source.StamenOptions} options Options.
 */
ol.source.Stamen = function(options) {

  var i = options.layer.indexOf('-');
  var provider = i == -1 ? options.layer : options.layer.slice(0, i);
  goog.asserts.assert(provider in ol.source.StamenProviderConfig);
  var providerConfig = ol.source.StamenProviderConfig[provider];

  goog.asserts.assert(options.layer in ol.source.StamenLayerConfig);
  var layerConfig = ol.source.StamenLayerConfig[options.layer];

  var url = goog.isDef(options.url) ? options.url :
      'http://{a-d}.tile.stamen.com/' + options.layer + '/{z}/{x}/{y}.' +
      layerConfig.extension;

  goog.base(this, {
    attributions: ol.source.STAMEN_ATTRIBUTIONS,
    maxZoom: providerConfig.maxZoom,
    // FIXME uncomment the following when tilegrid supports minZoom
    //minZoom: providerConfig.minZoom,
    opaque: layerConfig.opaque,
    url: url
  });

};
goog.inherits(ol.source.Stamen, ol.source.XYZ);
