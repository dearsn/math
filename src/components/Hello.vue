<template>
  <div class="hello">
    <mt-header title="一年级上"></mt-header>
    <div class="cont">
      <div v-if="started">
        
        <div v-if="ended">
          <mt-button size="large" type="danger" v-on:click="begin">再来一次</mt-button>
        </div>
        <div v-else>
          <div class="ques">
            {{ numa }} {{ action }} {{ numb }} =  <input v-model="answer" v-focus="focused" @focus="focused = true"style="width:50px;">
          </div>
          <mt-button size="large" type="danger" v-on:click="nextQuestion">下一题</mt-button>
          <div class="info">
            <div class="tt">对<span class="right">{{ right }}</span>道，错<span class="wrong">{{ wrong }}</span>道</div>
            <count-down v-on:end_callback="end" :startTime="startTime" :endTime="endTime" :tipTextEnd="'距离结束还有'" :endText="'结束'" class="time"></count-down>
          </div>
        </div>
      </div>
      <div v-else>
        <h2>总共5分钟，看看你能做多少题！</h2>
        <mt-button size="large" type="danger" v-on:click="begin">开始</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from 'vue2-countdown'
import { focus } from 'vue-focus'
export default {
  directives: { focus: focus },
  name: 'hello',
  components: {
    CountDown
  },
  data () {
    return {
      started: false,
      ended: false,
      startTime: (new Date()).getTime(),
      endTime: (new Date()).getTime() + 10,
      right: 0,
      wrong: 0,
      answer: '',
      focused: true,
      numa: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
      numb: Math.floor(Math.random() * (20 - 0 + 1)) + 0
    }
  },
  methods: {
    begin: function () {
      this.right = 0
      this.wrong = 0
      this.answer = ''
      this.started = true
      this.ended = false
      this.startTime = (new Date()).getTime()
      this.endTime = this.startTime + 300 * 1000
      console.log(this.startTime)
      console.log(this.endTime)
      this.newQuestion()
    },
    end: function () {
      this.ended = true
    },
    newQuestion: function () {
      const a = Math.floor(Math.random() * (20 - 0 + 1)) + 0
      const b = Math.floor(Math.random() * (20 - 0 + 1)) + 0
      if (a + b > 20) {
        this.action = '-'
        this.numa = Math.max(a, b)
        this.numb = Math.min(a, b)
      } else {
        if (this.action === '-') {
          this.action = '+'
          this.numa = a
          this.numb = b
        } else {
          this.action = '-'
          this.numa = Math.max(a, b)
          this.numb = Math.min(a, b)
        }
      }
      this.focused = true
    },
    nextQuestion: function () {
      if (this.action === '+') {
        if (Object.is(this.numa + this.numb, Number.parseInt(this.answer))) {
          this.right += 1
        } else {
          this.wrong += 1
        }
      } else {
        if (Object.is(this.numa - this.numb, Number.parseInt(this.answer))) {
          this.right += 1
        } else {
          this.wrong += 1
        }
      }
      this.answer = ''
      this.newQuestion()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{margin:0 0 20px;font-size:14px;}
.cont{padding:20px;}
.right{color:green;}
.wrong{color:red;}
.ques{padding-bottom:20px;font-size:22px;}
input{font-size:22px;}
.mint-button {opacity: 0.6;}
.info{display: flex;line-height: 30px;}
.info div{flex: 1;}
.info .time{text-align: right}
.info .tt{text-align: left}
</style>
