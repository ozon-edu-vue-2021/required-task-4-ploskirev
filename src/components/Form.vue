<template>
  <form class="form">
    <section class="form-block">
      <h2>Личные данные</h2>
      <div class="row">
        <InputText
          class="input-item"
          :placeholder="formFieldsData.surname.placeholder"
          :text="formFieldsData.surname.model"
          :label="formFieldsData.surname.label"
          :hasError="formFieldsData.surname.hasError"
          :errorMessage="formFieldsData.surname.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.surname)"
          @blur="validateForm(formFieldsData.surname)"
        />
        <InputText
          class="input-item"
          :placeholder="formFieldsData.name.placeholder"
          :text="formFieldsData.name.model"
          :label="formFieldsData.name.label"
          :hasError="formFieldsData.name.hasError"
          :errorMessage="formFieldsData.name.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.name)"
          @blur="validateForm(formFieldsData.name)"
        />
        <InputText
          class="input-item"
          :placeholder="formFieldsData.patronym.placeholder"
          :text="formFieldsData.patronym.model"
          :label="formFieldsData.patronym.label"
          :hasError="formFieldsData.patronym.hasError"
          :errorMessage="formFieldsData.name.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.patronym)"
          @blur="validateForm(formFieldsData.patronym)"
        />
        <InputText
          v-mask="'##.##.####'"
          class="input-item"
          :placeholder="formFieldsData.birthday.placeholder"
          :text="formFieldsData.birthday.model"
          :label="formFieldsData.birthday.label"
          :hasError="formFieldsData.birthday.hasError"
          :errorMessage="formFieldsData.birthday.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.birthday)"
          @blur="validateForm(formFieldsData.birthday)"
        />
        <InputText
          class="input-item"
          :placeholder="formFieldsData.email.placeholder"
          :text="formFieldsData.email.model"
          :label="formFieldsData.email.label"
          :hasError="formFieldsData.email.hasError"
          :errorMessage="formFieldsData.email.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.email)"
          @blur="validateForm(formFieldsData.email)"
        />
      </div>
    </section>
    <section class="form-block">
      <h2>Пол</h2>
      <InputRadio
        class="input-item"
        :name="formFieldsData.gender.label"
        :options="formFieldsData.gender.options"
        @selectionUpdated="updateModel($event, formFieldsData.gender)"
      />
    </section>
    <section class="form-block">
      <h2>Паспортные данные</h2>
      <DropDownInput
        class="input-item"
        :label="formFieldsData.citizenships.label"
        :options="formFieldsData.citizenships.options"
        :selected="formFieldsData.citizenships.model"
        :useSearch="true"
        :searchFields="['nationality', 'capital']"
        optKey="id"
        optLabel="nationality"
        @selectionUpdated="updateModel($event, formFieldsData.citizenships)"
      >
        <template #optionItem="props">
          <slot name="optionItem" v-bind="props">
            <div class="myoption-wrapper">
              <div class="myoption-info">
                <span class="myoption-info-addon">{{ props['capital'] }}</span>
                <span class="myoption-info-main">{{
                  props['nationality']
                }}</span>
              </div>
              <div>{{ props['flag'] }}</div>
            </div>
          </slot>
        </template>
      </DropDownInput>
      <div class="row" v-show="formFieldsData.citizenships.model.id !== 8604">
        <InputText
          class="input-item"
          :placeholder="formFieldsData.nameLatin.placeholder"
          :text="formFieldsData.nameLatin.model"
          :label="formFieldsData.nameLatin.label"
          :hasError="formFieldsData.nameLatin.hasError"
          :errorMessage="formFieldsData.nameLatin.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.nameLatin)"
          @blur="validateForm(formFieldsData.nameLatin)"
        />
        <InputText
          class="input-item"
          :placeholder="formFieldsData.surnameLatin.placeholder"
          :text="formFieldsData.surnameLatin.model"
          :label="formFieldsData.surnameLatin.label"
          :hasError="formFieldsData.surnameLatin.hasError"
          :errorMessage="formFieldsData.surnameLatin.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.surnameLatin)"
          @blur="validateForm(formFieldsData.surnameLatin)"
        />
      </div>
      <div class="row">
        <InputText
          v-show="formFieldsData.citizenships.model.id === 8604"
          v-mask="'####'"
          class="input-item"
          :placeholder="formFieldsData.passSerial.placeholder"
          :text="formFieldsData.passSerial.model"
          :label="formFieldsData.passSerial.label"
          :hasError="formFieldsData.passSerial.hasError"
          :errorMessage="formFieldsData.passSerial.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.passSerial)"
          @blur="validateForm(formFieldsData.passSerial)"
        />
        <InputText
          v-mask="formFieldsData.citizenships.model.id === 8604 ? '######' : ''"
          class="input-item"
          :placeholder="formFieldsData.passNumber.placeholder"
          :text="formFieldsData.passNumber.model"
          :label="formFieldsData.passNumber.label"
          :hasError="formFieldsData.passNumber.hasError"
          :errorMessage="formFieldsData.passNumber.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.passNumber)"
          @blur="validateForm(formFieldsData.passNumber)"
        />
        <DropDownInput
          class="input-item"
          v-show="formFieldsData.citizenships.model.id !== 8604"
          :label="formFieldsData.passEmitionCountry.label"
          :options="formFieldsData.passEmitionCountry.options"
          :selected="formFieldsData.passEmitionCountry.model"
          :useSearch="true"
          :searchFields="['nationality', 'capital']"
          optLabel="nationality"
          @selectionUpdated="
            updateModel($event, formFieldsData.passEmitionCountry)
          "
        >
          <template #optionItem="props">
            <slot name="optionItem" v-bind="props">
              <div class="myoption-wrapper">
                <div class="myoption-info">
                  <span class="myoption-info-addon">{{
                    props['capital']
                  }}</span>
                  <span class="myoption-info-main">{{
                    props['nationality']
                  }}</span>
                </div>
                <div>{{ props['flag'] }}</div>
              </div>
            </slot>
          </template>
        </DropDownInput>

        <DropDownInput
          class="input-item"
          v-show="formFieldsData.citizenships.model.id !== 8604"
          :label="formFieldsData.passType.label"
          :options="formFieldsData.passType.options"
          :selected="formFieldsData.passType.model"
          optKey="id"
          optLabel="type"
          @selectionUpdated="updateModel($event, formFieldsData.passType)"
        />
        <InputText
          v-show="formFieldsData.citizenships.model.id === 8604"
          v-mask="'##.##.####'"
          class="input-item"
          :placeholder="formFieldsData.passEmissionDate.placeholder"
          :text="formFieldsData.passEmissionDate.model"
          :label="formFieldsData.passEmissionDate.label"
          :hasError="formFieldsData.passEmissionDate.hasError"
          :errorMessage="formFieldsData.passEmissionDate.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.passEmissionDate)"
          @blur="validateForm(formFieldsData.passEmissionDate)"
        />
      </div>
    </section>
    <section class="form-block">
      <h2>Меняли ли фамилию или имя?</h2>
      <InputRadio
        class="input-item"
        :name="formFieldsData.isChangedName.label"
        :options="formFieldsData.isChangedName.options"
        @selectionUpdated="updateModel($event, formFieldsData.isChangedName)"
      />
      <div class="row" v-show="formFieldsData.isChangedName.model">
        <InputText
          class="input-item"
          :placeholder="formFieldsData.prevName.placeholder"
          :text="formFieldsData.prevName.model"
          :label="formFieldsData.prevName.label"
          :hasError="formFieldsData.prevName.hasError"
          :errorMessage="formFieldsData.prevName.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.prevName)"
          @blur="validateForm(formFieldsData.prevName)"
        />
        <InputText
          class="input-item"
          :placeholder="formFieldsData.prevSurname.placeholder"
          :text="formFieldsData.prevSurname.model"
          :label="formFieldsData.prevSurname.label"
          :hasError="formFieldsData.prevSurname.hasError"
          :errorMessage="formFieldsData.prevSurname.errorMessage"
          @contentUpdated="updateModel($event, formFieldsData.prevSurname)"
          @blur="validateForm(formFieldsData.prevSurname)"
        />
      </div>
    </section>
    <input type="submit" value="Отправить" @click.prevent="submitForm" />
  </form>
</template>

<script>
import citizenships from '@/assets/data/citizenships.json'
import passportTypes from '@/assets/data/passport-types.json'
import { checkDate } from '@/core/helpers.js'
import { TEXT, DATE } from '@/core/constants.js'
import InputText from '@/components/InputText.vue'
import InputRadio from '@/components/InputRadio.vue'
import DropDownInput from '@/components/dropDown/DropDownInput.vue'

export default {
  name: 'Form',
  components: {
    InputText,
    InputRadio,
    DropDownInput
  },
  data() {
    return {
      formFieldsData: {
        surname: {
          type: TEXT,
          placeholder: 'Иванов',
          model: '',
          label: 'Фамилия',
          validated: true,
          rules: /^[А-ё]+(-[А-ё]+)*$/,
          hasError: false,
          errorMessage: 'Только кириллица и -'
        },
        name: {
          type: TEXT,
          placeholder: 'Иван',
          model: '',
          label: 'Имя',
          validated: true,
          rules: /^[А-ё]+(-[А-ё]+)*$/,
          hasError: false,
          errorMessage: 'Только кириллица и -'
        },
        patronym: {
          type: TEXT,
          placeholder: 'Иванович',
          model: '',
          label: 'Отчество',
          validated: true,
          rules: /^[А-ё]+(-[А-ё]+)*$/,
          hasError: false,
          errorMessage: 'Только кириллица и -'
        },
        birthday: {
          type: DATE,
          placeholder: 'дд.мм.гггг',
          model: '',
          label: 'Дата рождения',
          validated: true,
          rules: /^\d{2}\.\d{2}\.\d{4}$/,
          hasError: false,
          errorMessage: 'Некорректная дата'
        },
        email: {
          type: TEXT,
          placeholder: 'te-st_@test.ru',
          model: '',
          label: ' E-mail',
          validated: true,
          rules: /^[\w-]+@[\w-]+\.[\w]+$/,
          hasError: false,
          errorMessage: 'Некорректный e-mail'
        },
        gender: {
          label: 'citizenship',
          model: '',
          options: [
            { key: 'male', label: 'Мужской' },
            { key: 'female', label: 'Женский' }
          ]
        },
        citizenships: {
          model: '',
          label: 'Гражданство',
          options: citizenships
        },
        passSerial: {
          type: TEXT,
          placeholder: '1234',
          model: '',
          label: 'Серия паспорта',
          validated: true,
          rules: /^\d{4}$/,
          hasError: false,
          errorMessage: '4 символа'
        },
        passNumber: {
          type: TEXT,
          placeholder: '123456',
          model: '',
          label: 'Номер паспорта',
          validated: true,
          rules: /^\d{6}$/,
          hasError: false,
          errorMessage: '6 символа'
        },
        passEmissionDate: {
          type: DATE,
          placeholder: 'дд.мм.гггг',
          model: '',
          label: 'Дата выдачи',
          validated: true,
          rules: /^\d{2}\.\d{2}\.\d{4}$/,
          hasError: false,
          errorMessage: 'Некорректная дата'
        },
        passEmitionCountry: {
          model: '',
          label: 'Страна выдачи',
          options: citizenships
        },
        passType: {
          type: TEXT,
          model: '',
          label: 'Тип паспорта',
          options: passportTypes
        },
        isChangedName: {
          label: 'changingName',
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
          ]
        },
        prevName: {
          type: TEXT,
          placeholder: 'Петр',
          model: '',
          label: 'Предыдущее имя',
          validated: true,
          rules: /^[А-ё]+(-[А-ё]+)*$/,
          hasError: false,
          errorMessage: 'Только кириллица и -'
        },
        prevSurname: {
          type: TEXT,
          placeholder: 'Петров',
          model: '',
          label: 'Предыдущая фамилия',
          validated: true,
          rules: /^[А-ё]+(-[А-ё]+)*$/,
          hasError: false,
          errorMessage: 'Только кириллица и -'
        },
        nameLatin: {
          type: TEXT,
          placeholder: 'Ivan',
          model: '',
          label: 'Имя на латинице',
          validated: true,
          rules: /^[A-z]+(-[A-z]+)*$/,
          hasError: false,
          errorMessage: 'Только латиница и -'
        },
        surnameLatin: {
          type: TEXT,
          placeholder: 'Ivanov',
          model: '',
          label: 'Фамилия на латинице',
          validated: true,
          rules: /^[A-z]+(-[A-z]+)*$/,
          hasError: false,
          errorMessage: 'Только латиница и -'
        }
      }
    }
  },
  created() {
    this.formFieldsData.citizenships.model = citizenships.find(
      el => el.id === 8604
    )
  },
  computed: {
    passNumberRule() {
      return /^\d{6}$/
    }
  },
  methods: {
    updateModel(text, target) {
      target.model = text
      if (target === this.formFieldsData.citizenships) {
        if (target.model.id === 8604) {
          this.formFieldsData.nameLatin.validated = false
          this.formFieldsData.surnameLatin.validated = false
          this.formFieldsData.passNumber.validated = true
          this.formFieldsData.passSerial.validated = true
          this.formFieldsData.passEmissionDate.validated = true
        } else {
          this.formFieldsData.passNumber.validated = false
          this.formFieldsData.passSerial.validated = false
          this.formFieldsData.passEmissionDate.validated = false
          this.formFieldsData.nameLatin.validated = true
          this.formFieldsData.surnameLatin.validated = true
        }
        this.validateField(this.formFieldsData.passNumber)
      }
      if (target === this.formFieldsData.isChangedName) {
        if (!target.model) {
          this.formFieldsData.prevName.validated = false
          this.formFieldsData.prevSurname.validated = false
        } else {
          this.formFieldsData.prevName.validated = true
          this.formFieldsData.prevSurname.validated = true
        }
      }
    },
    validateField(field) {
      if (field.model && field.validated) {
        if (field.type === DATE) {
          field.hasError = !checkDate(field.model)
        } else {
          field.hasError = !field.model.match(field.rules)
        }
      } else {
        field.hasError = false
      }
    },
    validateForm() {
      let isValidatedForm = true
      Object.values(this.formFieldsData).forEach(field => {
        this.validateField(field)
        field.hasError && (isValidatedForm = false)
      })
      return isValidatedForm
    },
    submitForm() {
      if (!this.validateForm()) {
        console.log('Проверьте корректность заполнения полей')
        this.$notify({
          type: 'warn',
          group: 'formSubmit',
          title: 'Форма не отправлена',
          text: 'Проверьте корректность заполнения полей формы'
        })
        return
      }
      const result = {
        surname: this.formFieldsData.surname.model,
        name: this.formFieldsData.name.model,
        patronym: this.formFieldsData.patronym.model,
        birthday: this.formFieldsData.birthday.model,
        email: this.formFieldsData.email.model,
        gender: this.formFieldsData.gender.model,
        citizenship: this.formFieldsData.citizenships.model,
        passNumber: this.formFieldsData.passNumber.model,
        isChangedName: this.formFieldsData.isChangedName.model
      }
      if (result.isChangedName) {
        result.prevName = this.formFieldsData.prevName.model
        result.prevSurname = this.formFieldsData.prevSurname.model
      }
      if (this.formFieldsData.citizenships.model.id === 8604) {
        result.passSerial = this.formFieldsData.passSerial.model
        result.passEmissionDate = this.formFieldsData.passEmissionDate.model
      } else {
        result.latinName = this.formFieldsData.nameLatin.model
        result.latinSurname = this.formFieldsData.surnameLatin.model
        result.passEmitionCountry = this.formFieldsData.passEmitionCountry
        result.passType = this.formFieldsData.passType.model
      }
      this.$notify({
        type: 'success',
        group: 'formSubmit',
        title: 'Форма отправлена'
      })
      console.log(result)
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
