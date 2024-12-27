<template>
  <div class="operationmanagementconfigurment">
    <a-form
      ref="formDataRef"
      :model="state.formData"
      autocomplete="off"
      :label-col="{ style: { width: '170px' } }"
    >
      <a-space
        direction="vertical"
        :style="{
          width: '100%',
        }"
      >
        <CommonTitle title="客流阈值" />
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="蓄车场南存车数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_south_parking_lot_parking_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_south_parking_lot_parking_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_south_parking_lot_parking_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="P9坡道拥堵车辆数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_p9_ramp_congested_vehicle_count_${key}`
                        ]
                      "
                      :placeholder="`请输入${key}值`"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="p9出入口拥堵车辆数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p9_entrance_and_exit_congested_vehicle_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p9_entrance_and_exit_congested_vehicle_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p9_entrance_and_exit_congested_vehicle_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="蓄车场北存车数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_north_parking_lot_parking_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_north_parking_lot_parking_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_north_parking_lot_parking_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="p10坡道拥堵车辆数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_ramp_congested_vehicle_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_ramp_congested_vehicle_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_ramp_congested_vehicle_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="p10出入口拥堵车辆数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_entrance_and_exit_congested_vehicle_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_entrance_and_exit_congested_vehicle_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_entrance_and_exit_congested_vehicle_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="P9场库车位占用数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p9_parking_lot_parking_space_occupy_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p9_parking_lot_parking_space_occupy_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p9_parking_lot_parking_space_occupy_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="P10场库车位占用数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_parking_lot_parking_space_occupy_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_parking_lot_parking_space_occupy_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_p10_parking_lot_parking_space_occupy_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="ERC预测数值">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_erc_prediction_value_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_erc_prediction_value_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_erc_prediction_value_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="出租车上客点排队时长">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_taxi_boarding_point_wait_time_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_taxi_boarding_point_wait_time_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_taxi_boarding_point_wait_time_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="场区挤压人数">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_area_packed_person_count_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_area_packed_person_count_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .passenger_flow_threshold_area_packed_person_count_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <CommonTitle title="雷达图比例" />
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="高峰日">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_peak_day_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_peak_day_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_peak_day_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="客流">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_passenger_flow_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_passenger_flow_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_passenger_flow_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="高峰时段">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_peak_hour_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_peak_hour_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_peak_hour_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="天气">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_weather_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_weather_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="state.formData.radar_threshold_weather_red"
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="会展">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_exhibition_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_exhibition_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.radar_threshold_exhibition_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>

        <CommonTitle title="历史数据对比报警值" />
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="出租车">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_taxi_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_taxi_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_taxi_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="网约车">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_ehailing_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_ehailing_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_ehailing_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="停车库">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .history_compare_threshold_parking_lot_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData
                          .history_compare_threshold_parking_lot_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_parking_lot_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="地铁">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_metro_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_metro_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_metro_red
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="其他">
              <a-row>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_other_green
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_other_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
                <a-col :span="8">
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData.history_compare_threshold_other_yellow
                      "
                      placeholder="请输入"
                    >
                    </a-input>
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
      </a-space>
    </a-form>

    <a-row justify="end">
      <a-col>
        <a-button type="primary" @click="handleSubmit">确认</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="tsx" setup>
import {
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
  nextTick,
} from "vue";
import type { Rule } from "ant-design-vue/es/form";

import {
  operationManagementOperationConfigGetListRequest,
  operationManagementOperationConfigConfigRequest,
} from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  dateType: {
    type: [String, Number],
    default: null,
    required: false,
  },
  activeTabId: {
    type: [String, Number],
    default: null,
    required: false,
  },
});

const state = reactive({
  visible: false,
  formData: {} as any,
});

let queryFormData = reactive({
  dateType: null,
} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

watch(
  () => props.dateType,
  (newValue: any, oldValue: any) => {}
);

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
  seconds: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "change",
    },
  ],
};

const getData = () => {
  operationManagementOperationConfigGetListRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      console.log(response);
      response = response.data;
      response.forEach((item: any) => {
        state.formData[item.configCode] = item.configValue;
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleSubmit = () => {
  const params = [] as any[];
  Object.keys(state.formData).forEach((item: any) => {
    params.push({
      configCode: item,
      configValue: state.formData[item],
      dateType: props.dateType,
    });
  });
  operationManagementOperationConfigConfigRequest(params)
    .then((response: any) => {
      console.log(response);
      global.$message.success("提交成功");
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
    });
};

onMounted(async () => {
  queryFormData.dateType = props.dateType;
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_tab_container {
  background-color: transparent !important;
}
.operationmanagementconfigurment {
  margin: 0.1rem 0;
  padding: 0.3rem 0;
  background-color: #010f27;
}
</style>
