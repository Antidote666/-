<template>
  <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
    <bm-marker
      v-for="map in mapDatas"
      :key="map.label"
      :position="{ lng: map.coord.longitude, lat: map.coord.latitude }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        :content="map.label"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        :offset="{ width: -35, height: 30 }"
      />
    </bm-marker>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 45,
      mapDatas: [
        {
          label: '朝阳',
          value: 'AREA|69cc5f6d-4f29-a77c',
          coord: {
            latitude: '39.912338',
            longitude: '116.449979'
          },
          count: 588
        },
        {
          label: '丰台',
          value: 'AREA|0dd58113-90ab-4d85',
          coord: {
            latitude: '39.858097',
            longitude: '116.292081'
          },
          count: 200
        },
        {
          label: '西城',
          value: 'AREA|fdb2a2a2-519c-9cf7',
          coord: {
            latitude: '39.958385',
            longitude: '116.399275'
          },
          count: 324
        },
        {
          label: '海淀',
          value: 'AREA|6524c161-1f81-d73c',
          coord: {
            latitude: '39.935122',
            longitude: '116.28592'
          },
          count: 316
        },
        {
          label: '昌平',
          value: 'AREA|6cf8e88f-1e1f-e395',
          coord: {
            latitude: '40.225155',
            longitude: '116.250886'
          },
          count: 35
        },
        {
          label: '通州',
          value: 'AREA|c3ec1269-459e-491c',
          coord: {
            latitude: '39.90911',
            longitude: '116.642238'
          },
          count: 89
        },
        {
          label: '石景山',
          value: 'AREA|7253a8eb-dea5-a522',
          coord: {
            latitude: '39.937331',
            longitude: '116.171857'
          },
          count: 31
        },
        {
          label: '顺义',
          value: 'AREA|509dc430-5a85-1a1a',
          coord: {
            latitude: '40.137571',
            longitude: '116.648422'
          },
          count: 35
        },
        {
          label: '大兴',
          value: 'AREA|d4d85a7b-712f-fd9d',
          coord: {
            latitude: '39.770444',
            longitude: '116.344335'
          },
          count: 73
        },
        {
          label: '房山',
          value: 'AREA|56c2a821-73c2-1c1f',
          coord: {
            latitude: '39.765558',
            longitude: '116.213828'
          },
          count: 34
        },
        {
          label: '亦庄开发区',
          value: 'AREA|f46287e7-3d9e-fbf6',
          coord: {
            latitude: '39.784679',
            longitude: '116.561137'
          },
          count: 12
        },
        {
          label: '门头沟',
          value: 'AREA|cb61da76-ef85-ad84',
          coord: {
            latitude: '39.918834',
            longitude: '116.121948'
          },
          count: 6
        },
        {
          label: '天安门',
          value: 'AREA|cb61da76-ef85-ad84',
          coord: {
            latitude: '39.915',
            longitude: '116.404'
          },
          count: 6
        }
      ]
    }
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 100
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 100vh;
}
</style>
