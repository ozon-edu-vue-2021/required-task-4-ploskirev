<template>
  <form class="form">
    <section
      v-for="section in formData.sections"
      :key="section.key"
      class="form-block"
    >
      <h2>{{ section.title }}</h2>
      <div v-for="(row, rowIdx) in section.rows" :key="rowIdx" class="row">
        <template v-for="(field, fieldTitle) in row.fields">
          <InputText
            v-if="isTextField(field)"
            v-show="isVisibleField(field)"
            :key="fieldTitle"
            v-mask="getFieldMask(field)"
            class="input-item"
            :placeholder="field.placeholder"
            :text="field.model"
            :label="field.label"
            :hasError="field.hasError"
            :errorMessage="field.errorMessage"
            @contentUpdated="updateModel($event, field)"
            @blur="validateField(field)"
          />
          <InputRadio
            v-if="isRadioField(field)"
            v-show="isVisibleField(field)"
            :key="fieldTitle"
            class="input-item"
            :name="field.label"
            :options="field.options"
            @selectionUpdated="updateModel($event, field)"
          />
          <DropDownInput
            v-if="isDropDownField(field)"
            v-show="isVisibleField(field)"
            :key="fieldTitle"
            class="input-item"
            :label="field.label"
            :options="field.options"
            :selected="field.model"
            :useSearch="field.withSearch"
            :searchFields="field.searchFields"
            :optKey="field.optKey"
            :optLabel="field.optLabel"
            @selectionUpdated="updateModel($event, field)"
          >
            <template v-if="hasSlot(fieldTitle)" #optionItem="props">
              <slot name="optionItem" v-bind="props">
                <div class="myoption-wrapper">
                  <div class="myoption-info">
                    <span class="myoption-info-addon">{{
                      props[constants.CAPITAL]
                    }}</span>
                    <span class="myoption-info-main">{{
                      props[constants.NATIONALITY]
                    }}</span>
                  </div>
                  <div>{{ props[constants.FLAG] }}</div>
                </div>
              </slot>
            </template>
          </DropDownInput>
        </template>
      </div>
    </section>
    <input type="submit" value="Отправить" @click.prevent="submitForm" />
  </form>
</template>

<script>
import citizenships from '/src/assets/data/citizenships.json'
import passportTypes from '/src/assets/data/passport-types.json'
import { checkDate } from '/src/core/helpers.js'
import * as constants from '/src/core/constants.js'
import InputText from '/src/components/InputText.vue'
import InputRadio from '/src/components/InputRadio.vue'
import DropDownInput from '/src/components/dropDown/DropDownInput.vue'

const { TEXT, RADIO, DATE, DROPDOWN } = constants
const {
  CITIZ,
  IS_CHANGE_NAME,
  PASS_COUNTRY_EMIT,
  SURNAME,
  NAME,
  PATRONYM,
  B_DAY,
  EMAIL,
  PASS_SERIAL,
  PASS_TYPE,
  NAME_LATIN,
  SURNAME_LATIN,
  GENDER,
  PASS_NUMBER,
  PASS_DATE_EMIT,
  PREV_SURNAME,
  PREV_NAME
} = constants
const { EQUAL, NOT_EQUAL, RUS_ID, MALE, FEMALE } = constants
export default {
  name: 'Form',
  components: {
    InputText,
    InputRadio,
    DropDownInput
  },
  data() {
    return {
      constants,
      formData: {
        sections: [
          {
            title: 'Личные данные',
            key: 'personal',
            rows: [
              {
                fields: {
                  [SURNAME]: {
                    type: TEXT,
                    placeholder: 'Иванов',
                    model: '',
                    label: 'Фамилия',
                    validated: true,
                    rules: /^[А-ё]+(-[А-ё]+)*$/,
                    hasError: false,
                    errorMessage: 'Только кириллица и -'
                  },
                  [NAME]: {
                    type: TEXT,
                    placeholder: 'Иван',
                    model: '',
                    label: 'Имя',
                    validated: true,
                    rules: /^[А-ё]+(-[А-ё]+)*$/,
                    hasError: false,
                    errorMessage: 'Только кириллица и -'
                  },
                  [PATRONYM]: {
                    type: TEXT,
                    placeholder: 'Иванович',
                    model: '',
                    label: 'Отчество',
                    validated: true,
                    rules: /^[А-ё]+(-[А-ё]+)*$/,
                    hasError: false,
                    errorMessage: 'Только кириллица и -'
                  },
                  [B_DAY]: {
                    type: DATE,
                    placeholder: 'дд.мм.гггг',
                    mask: '##.##.####',
                    model: '',
                    label: 'Дата рождения',
                    validated: true,
                    rules: /^\d{2}\.\d{2}\.\d{4}$/,
                    hasError: false,
                    errorMessage: 'Некорректная дата'
                  },
                  [EMAIL]: {
                    type: TEXT,
                    placeholder: 'te-st_@test.ru',
                    model: '',
                    label: ' E-mail',
                    validated: true,
                    rules: /^[\w-]+@[\w-]+\.[\w]+$/,
                    hasError: false,
                    errorMessage: 'Некорректный e-mail'
                  }
                }
              }
            ]
          },
          {
            title: 'Пол',
            key: 'gender',
            rows: [
              {
                fields: {
                  [GENDER]: {
                    type: RADIO,
                    label: GENDER,
                    model: '',
                    options: [
                      { key: MALE, label: 'Мужской' },
                      { key: FEMALE, label: 'Женский' }
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'Паспортные данные',
            key: constants.PASS_DATA,
            rows: [
              {
                fields: {
                  [CITIZ]: {
                    type: DROPDOWN,
                    model: '',
                    label: 'Гражданство',
                    withSearch: true,
                    searchFields: [constants.NATIONALITY, constants.CAPITAL],
                    options: citizenships,
                    optKey: 'id',
                    optLabel: constants.NATIONALITY,
                    linkedFields: [
                      PASS_SERIAL,
                      PASS_NUMBER,
                      PASS_DATE_EMIT,
                      PASS_COUNTRY_EMIT,
                      PASS_TYPE,
                      NAME_LATIN,
                      SURNAME_LATIN
                    ]
                  }
                }
              },
              {
                fields: {
                  [PASS_SERIAL]: {
                    type: TEXT,
                    placeholder: '1234',
                    mask: '####',
                    model: '',
                    label: 'Серия паспорта',
                    validated: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: EQUAL,
                          value: RUS_ID
                        }
                      }
                    ],
                    rules: /^\d{4}$/,
                    hasError: false,
                    errorMessage: '4 символа',
                    visibilityRules: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: EQUAL,
                          value: RUS_ID
                        }
                      }
                    ]
                  },
                  [PASS_NUMBER]: {
                    type: TEXT,
                    placeholder: '123456',
                    mask: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          value: RUS_ID,
                          rule: EQUAL,
                          mask: '######'
                        }
                      }
                    ],
                    model: '',
                    label: 'Номер паспорта',
                    validated: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: EQUAL,
                          value: RUS_ID
                        }
                      }
                    ],
                    rules: /^\d{6}$/,
                    hasError: false,
                    errorMessage: '6 символов'
                  },
                  [PASS_DATE_EMIT]: {
                    type: DATE,
                    placeholder: 'дд.мм.гггг',
                    mask: '##.##.####',
                    model: '',
                    label: 'Дата выдачи',
                    validated: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: EQUAL,
                          value: RUS_ID
                        }
                      }
                    ],
                    rules: /^\d{2}\.\d{2}\.\d{4}$/,
                    hasError: false,
                    errorMessage: 'Некорректная дата',
                    visibilityRules: [
                      {
                        [CITIZ]: {
                          rule: NOT_EQUAL,
                          value: ''
                        }
                      },
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: EQUAL,
                          value: RUS_ID
                        }
                      }
                    ]
                  },
                  [PASS_COUNTRY_EMIT]: {
                    type: DROPDOWN,
                    model: '',
                    label: 'Страна выдачи',
                    withSearch: true,
                    searchFields: [constants.NATIONALITY, constants.CAPITAL],
                    options: citizenships,
                    optKey: 'id',
                    optLabel: constants.NATIONALITY,
                    visibilityRules: [
                      {
                        [CITIZ]: {
                          rule: NOT_EQUAL,
                          value: ''
                        }
                      },
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: NOT_EQUAL,
                          value: RUS_ID
                        }
                      }
                    ]
                  },
                  [PASS_TYPE]: {
                    type: DROPDOWN,
                    model: '',
                    label: 'Тип паспорта',
                    withSearch: false,
                    options: passportTypes,
                    optKey: 'id',
                    optLabel: 'type',
                    visibilityRules: [
                      {
                        [CITIZ]: {
                          rule: NOT_EQUAL,
                          value: ''
                        }
                      },
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: NOT_EQUAL,
                          value: RUS_ID
                        }
                      }
                    ]
                  },
                  [NAME_LATIN]: {
                    type: TEXT,
                    placeholder: 'Ivan',
                    model: '',
                    label: 'Имя на латинице',
                    validated: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: NOT_EQUAL,
                          value: RUS_ID
                        }
                      }
                    ],
                    rules: /^[A-z]+(-[A-z]+)*$/,
                    hasError: false,
                    errorMessage: 'Только латиница и -',
                    visibilityRules: [
                      {
                        [CITIZ]: {
                          rule: NOT_EQUAL,
                          value: ''
                        }
                      },
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: NOT_EQUAL,
                          value: RUS_ID
                        }
                      }
                    ]
                  },
                  [SURNAME_LATIN]: {
                    type: TEXT,
                    placeholder: 'Ivanov',
                    model: '',
                    label: 'Фамилия на латинице',
                    validated: [
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: NOT_EQUAL,
                          value: RUS_ID
                        }
                      }
                    ],
                    rules: /^[A-z]+(-[A-z]+)*$/,
                    hasError: false,
                    errorMessage: 'Только латиница и -',
                    visibilityRules: [
                      {
                        [CITIZ]: {
                          rule: NOT_EQUAL,
                          value: ''
                        }
                      },
                      {
                        [CITIZ]: {
                          prop: 'id',
                          rule: NOT_EQUAL,
                          value: RUS_ID
                        }
                      }
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'Меняли ли фамилию или имя',
            key: 'changingName',
            rows: [
              {
                fields: {
                  [IS_CHANGE_NAME]: {
                    type: RADIO,
                    label: IS_CHANGE_NAME,
                    model: '',
                    options: [
                      {
                        key: true,
                        label: 'Да'
                      },
                      {
                        key: false,
                        label: 'Нет'
                      }
                    ],
                    linkedFields: [PREV_NAME, PREV_SURNAME]
                  }
                }
              },
              {
                fields: {
                  [PREV_NAME]: {
                    type: TEXT,
                    placeholder: 'Петр',
                    model: '',
                    label: 'Предыдущее имя',
                    validated: [
                      {
                        [IS_CHANGE_NAME]: {
                          rule: EQUAL,
                          value: true
                        }
                      }
                    ],
                    rules: /^[А-ё]+(-[А-ё]+)*$/,
                    hasError: false,
                    errorMessage: 'Только кириллица и -',
                    visibilityRules: [
                      {
                        [IS_CHANGE_NAME]: {
                          rule: EQUAL,
                          value: true
                        }
                      }
                    ]
                  },
                  [PREV_SURNAME]: {
                    type: TEXT,
                    placeholder: 'Петров',
                    model: '',
                    label: 'Предыдущая фамилия',
                    validated: [
                      {
                        [IS_CHANGE_NAME]: {
                          rule: EQUAL,
                          value: true
                        }
                      }
                    ],
                    rules: /^[А-ё]+(-[А-ё]+)*$/,
                    hasError: false,
                    errorMessage: 'Только кириллица и -',
                    visibilityRules: [
                      {
                        [IS_CHANGE_NAME]: {
                          rule: EQUAL,
                          value: true
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getField(CITIZ).model = citizenships.find(el => el.id === RUS_ID)
  },
  methods: {
    getField(fieldTitle) {
      let field = null
      this.formData.sections.forEach(section => {
        section.rows.forEach(row => {
          if (row.fields[fieldTitle]) {
            field = row.fields[fieldTitle]
          }
        })
      })
      return field
    },
    isTextField(field) {
      return [TEXT, DATE].some(type => field.type === type)
    },
    isRadioField(field) {
      return field.type === RADIO
    },
    isDropDownField(field) {
      return field.type === DROPDOWN
    },
    hasSlot(fieldName) {
      return [constants.CITIZ, constants.PASS_COUNTRY_EMIT].some(
        el => fieldName === el
      )
    },
    getFieldMask(field) {
      if (!field.mask) return ''
      if (typeof field.mask === 'string') return field.mask
      if (typeof field.mask === 'object') {
        const maskObject = field.mask.find(this.checkFieldConditions)
        const mask = maskObject ? Object.values(maskObject)[0].mask : ''
        return mask
      }
    },
    isValidatedField(field) {
      if (!field.validated) return false
      if (field.validated === true) return true
      if (Array.isArray(field.validated)) {
        const validator = field.validated.find(this.checkFieldConditions)
        return Boolean(validator)
      }
    },
    isVisibleField(field) {
      if (!field.visibilityRules) return true
      return field.visibilityRules.every(this.checkFieldConditions)
    },
    checkFieldConditions(rule) {
      const [[fieldTitle, conditions]] = Object.entries(rule)
      const fieldObj = this.getField(fieldTitle)
      const comparingValue = fieldObj.model[conditions.prop] ?? fieldObj.model
      if (conditions.rule === EQUAL) {
        return comparingValue === conditions.value
      } else if (conditions.rule === NOT_EQUAL) {
        return comparingValue !== conditions.value
      }
    },
    updateModel(newValue, target) {
      target.model = newValue
      if (target.linkedFields) {
        // в связи с работой v-mask пришлось это завернуть в nextTick
        this.$nextTick(() => {
          target.linkedFields.forEach(fieldTitle =>
            this.validateField(this.getField(fieldTitle))
          )
        })
      }
    },
    validateField(field) {
      if (field.model && this.isValidatedField(field)) {
        if (field.type === DATE) {
          field.hasError = !checkDate(field.model)
        } else {
          field.hasError = !field.model.match(field.rules)
        }
      } else {
        field.hasError = false
      }
    },
    getFormValidation() {
      let isValidatedForm = true
      this.formData.sections.forEach(section => {
        section.rows.forEach(row => {
          Object.values(row.fields).forEach(field => {
            this.validateField(field)
            field.hasError && (isValidatedForm = false)
          })
        })
      })
      return isValidatedForm
    },
    getFormDataForSubmit() {
      const result = {
        surname: this.getField(SURNAME).model,
        name: this.getField(NAME).model,
        patronym: this.getField(PATRONYM).model,
        birthday: this.getField(B_DAY).model,
        email: this.getField(EMAIL).model,
        gender: this.getField(GENDER).model,
        citizenship: this.getField(CITIZ).model,
        passNumber: this.getField(PASS_NUMBER).model,
        isChangedName: this.getField(IS_CHANGE_NAME).model
      }
      if (result.isChangedName) {
        result.prevName = this.getField(PREV_NAME).model
        result.prevSurname = this.getField(PREV_SURNAME).model
      }
      if (result.citizenship.id === 8604) {
        result.passSerial = this.getField(PASS_SERIAL).model
        result.passEmissionDate = this.getField(PASS_DATE_EMIT).model
      } else {
        result.latinName = this.getField(NAME_LATIN).model
        result.latinSurname = this.getField(SURNAME_LATIN).model
        result.passEmitionCountry = this.getField(PASS_COUNTRY_EMIT).model
        result.passType = this.getField(PASS_TYPE).model
      }
      return result
    },
    submitForm() {
      if (!this.getFormValidation()) {
        console.log('Проверьте корректность заполнения полей')
        this.$notify({
          type: 'warn',
          group: 'formSubmit',
          title: 'Форма не отправлена',
          text: 'Проверьте корректность заполнения полей формы'
        })
        return
      }
      const result = this.getFormDataForSubmit()
      console.log(result)
      this.$notify({
        type: 'success',
        group: 'formSubmit',
        title: 'Форма отправлена'
      })
    }
  }
}
</script>

<style scoped>
form {
  text-align: center;
}

.form-block {
  margin: 20px 0;
  text-align: left;
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.input-item {
  flex-shrink: 0;
  width: 30%;
  margin: 5px 10px;
}

input[type='submit'] {
  height: 30px;
  background: rgb(41, 97, 219);
  outline: none;
  border: none;
  color: #fff;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

input[type='submit']:hover {
  background: rgb(90, 131, 221);
}

input[type='submit']:active {
  transform: translateY(2px);
}

.myoption-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.myoption-info {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.myoption-info-addon {
  font-size: 10px;
}

.myoption-info-main {
  font-size: 14px;
}
</style>
