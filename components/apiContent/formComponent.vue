<template lang="">
  <div>
    <div v-if="formItem.type == 'header'">
      <legend class="form__legend">{{ formItem.title }}</legend>
    </div>



    <div v-if="formItem.type == 'date'">
      <div class="form-group">
        <label class="control-label" :for="`date-${formItem.id}`"
          >{{ formItem.title }}
          <span v-if="formItem.required == true" class="required">*</span>
        </label>
        <div class="input">


<!--          <input-->
<!--            :required="formItem.required == true ? true : false"-->
<!--            :placeholder="-->
<!--              formItem.options && formItem.options !== null && formItem.options[0] -->
<!--                ? formItem.options[0].placeholder-->
<!--                : null-->
<!--            "-->
<!--            class="form-control"-->
<!--            :id="`date-${formItem.id}`"-->
<!--            type="date"-->
<!--            :name="`f${formItem.id}`"-->
<!--            value=""-->
<!--          />-->





          <template v-if="formItem.id == 8">
            <date-picker
              :disabled-date="disabledRange"
              :input-attr="formItem.required == true ? {required: 'true'} : {}"
              :id="`id${formItem.id}`"
              name="`name${formItem.id}`"
              v-model="field"
              valueType="format"
              @change="handleChange"
              @input="handleInput"
              format="DD.MM.YYYY"
            ></date-picker>
          </template>
          <template v-else>
            <date-picker :input-attr="formItem.required == true ? {required: 'true'} : {}" :id="`id${formItem.id}`" name="`name${formItem.id}`" v-model="field" valueType="format" @change="handleChange" format="DD.MM.YYYY"></date-picker>
          </template>

          <input
            class="dates form-control"
            :id="`textInputId-${formItem.id}`"
            type="hidden"
            :name="`f${formItem.id}`"
            value=""
          />




        </div>
      </div>
    </div>

    <div v-if="formItem.type == 'text'">
      <div class="form-group">
        <label class="control-label" :for="`textInputId-${formItem.id}`"
          >{{ formItem.title }}
          <span v-if="formItem.required == true" class="required">*</span>
        </label>
        <div class="input">
          <input
            :required="formItem.required == true ? true : false"
            :placeholder="
              formItem.options && formItem.options !== null && formItem.options[0] 
                ? formItem.options[0].placeholder
                : null
            "
            class="form-control"
            :id="`textInputId-${formItem.id}`"
            type="text"
            :name="`f${formItem.id}`"
            value=""
          />
        </div>
      </div>
    </div>


    <div v-if="formItem.type == 'email'">
      <div class="form-group">
        <label class="control-label" :for="`textInputId-${formItem.id}`"
          >{{ formItem.title }}
          <span v-if="formItem.required == true" class="required">*</span>
        </label>
        <div class="input">
          <input
            :required="formItem.required == true ? true : false"
            :placeholder="
              formItem.options && formItem.options !== null && formItem.options[0]
                ? formItem.options[0].placeholder
                : null
            "
            class="form-control"
            :id="`textInputId-${formItem.id}`"
            type="email"
            pattern="^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]{2,}$"
            :name="`f${formItem.id}`"
            value=""
          />
        </div>
      </div>
    </div>

    <div v-if="formItem.type == 'hidden'">
      <div class="form-group">
        <div class="input">
          <input
            :required="formItem.required == true ? true : false"
            :placeholder="
              formItem.options && formItem.options !== null && formItem.options[0] 
                ? formItem.options[0].placeholder
                : null
            "
            class="form-control"
            :id="`textInputId-${formItem.id}`"
            type="hidden"
            :name="`f${formItem.id}`"
            :value="objectClicked"
          />
        </div>
      </div>
    </div>
    <div v-if="formItem.type == 'checkbox' && formItem.sent == true">
      <div class="form-group">
        <div class="input checkbox">
          <div class="form-check">
            <label
              class="add-on form-check-label"
              :for="`checkboxId-${formItem.id}`"
            >
              <input
                class="add-on"
                :id="`checkboxId-${formItem.id}`"
                type="checkbox"
                :name="`f${formItem.id}`"
                value="on"
                :required="formItem.required == true ? true : false"
              /><span>{{ formItem.title }}</span></label
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="formItem.type == 'checkbox' && formItem.sent != true">
      <div class="form-group">
        <div class="input checkbox">
          <div class="form-check">
            <label
              class="add-on form-check-label"
              :for="`checkboxId-${formItem.id}`"
            >
              <input
                class="add-on"
                :id="`checkboxId-${formItem.id}`"
                type="checkbox"
                :required="formItem.required == true ? true : false"
              /><span>{{ formItem.title }}</span></label
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="formItem.type == 'textarea'">
      <div class="form-group">
        <label class="control-label" :for="`textInputId-${formItem.id}`"
          >{{ formItem.title }}
          <span v-if="formItem.required == true" class="required">*</span>
        </label>
        <div class="input">
          <textarea
            :required="formItem.required == true ? true : false"
            :placeholder="
             formItem.options && formItem.options !== null && formItem.options[0] 
                ? formItem.options[0].placeholder
                : null
            "
            class="xxlarge form-control"
            :id="`textInputId-${formItem.id}`"
            type="text"
            :name="`f${formItem.id}`"
            value=""
          />
        </div>
      </div>
    </div>
    <div v-if="formItem.type == 'description'">
      <div class="clearfix">
        <p>{{ formItem.title }}</p>
      </div>
    </div>
    <div v-if="formItem.type == 'link'">
      <div class="clearfix">
        <div
          id="c210"
          class="frame frame-default frame-type-text frame-layout-0 frame-space-before-none frame-space-after-none"
        >
          <div class="frame-container">
            <div class="frame-inner">
              <p>
                <a
                  :href="formItem.options[0].href"
                  target="_blank"
                  >{{ formItem.title }}</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="formItem.type == 'submit'">
      <div class="actions">
        <nav class="form-navigation">
          <div class="btn-toolbar" role="toolbar">
            <div class="btn-group" role="group">
              <span class="btn-group next submit"
                ><button
                  class="btn btn-primary"
                  type="submit"
                  :name="`buttonId-${formItem.id}`"
                >
                  {{ formItem.title }}
                </button>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  name: "FormComponent",
  props: ["formItem"],
  data() {
    return {
      time1: null,
      objectClicked: this.$store.state.transferParams.objectClicked,
      t3page: {
        appearance: {
          backendLayout: "default",
        },
        content: {
          colPos0: [],
        },
      },
      field: null,
      data() {
        let minMinDate = '';
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // 15th two months prior
        const minDate = new Date(today);
        minDate.setMonth(minDate.getMonth() - 2);
        minDate.setDate(15);
        // 15th in two months
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 2);
        maxDate.setDate(15);

        return {
          value: '',
          min: minDate,
          max: maxDate
        }
      }
    };
  },
  methods: {
    handleChange(value, type) {
      let id = this._props.formItem.id;
      let hidden = document.querySelector("#textInputId-"+id);
      let picker = document.querySelector("div#id"+id+">div.mx-input-wrapper input.mx-input");
      if(type === 'date') {
        if(value === '') {
          alert('set focus');
          picker.reqired = true;
        } else {
          hidden.value=value;
          picker.value=value;
        }
      }
    },
    disabledRange: function (date) {
      let d = document.getElementById('textInputId-7').value;
      console.log('d: ', d);
      let ar = d.split('.');
      return date < new Date(parseInt(ar[2],10), parseInt(ar[1],10)-1, parseInt(ar[0],10)) || date > new Date(2030, 0, 1);
    },
  },
};
</script>
