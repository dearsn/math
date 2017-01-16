<template>
  <div class="hello">
    <h1>一年级上</h1>
    <div v-if="started">
      <h2>对{{ right }}道，错{{ wrong }}道</h2>
      <div v-if="ended">
        <button v-on:click="begin">再来一次</button>
      </div>
      <div v-else>
        <count-down v-on:end_callback="end" :startTime="startTime" :endTime="endTime" :tipTextEnd="'距离结束还有'" :endText="'结束'"></count-down>
        <div>
        <p>{{ numa }} {{ action }} {{ numb }} =  </p>
        <input v-model="answer" v-focus="true">
        <br>
        <button v-on:click="nextQuestion">下一题</button>
        </div>
      </div>
    </div>
    <div v-else>
      总共5分钟，看看你能做多少题！
      <br>
      <button v-on:click="begin">开始</button>
    </div>
  </div>
</template>

<script>
import CountDown from 'vue2-countdown'
export default {
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
