<template>
  <div class="missionList">
    <div class="listContainer" v-for="(m, index) in missionData" :key="index">
      <div class="w-full">
        {{ m.missionName }}
      </div>
      <div class="flex justify-between mt-5">
        <div>{{ m.userName }}</div>
        <div>{{ m.startday }} - {{ m.endday }}</div>
      </div>
      <div class="flex justify-between mt-5">
        <div>{{ m.location }}</div>
        <div>${{ m.money }}</div>
      </div>
      <div class="w-full mt-5">
        {{ wordLimit(m.experience) }}
      </div>
      <div class="flex flex-wrap mt-5">
        <el-card shadow="always" class="mr-1" v-for="(s, index2) in m.selectedSkills" :key="index2">
          {{ s }}
        </el-card>
        <el-card shadow="always" class="mr-1" v-for="(l, index3) in m.selectedLanguages" :key="index3">
          {{ l.lan }} {{ l.level }}
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface selectedLanguage {
  lan: string;
  level: string;
}

interface mission {
  missionName: string,
  startday: string,
  endday: string,
  type: string,
  currency: string,
  money: string,
  location: string,
  userName: string;
  phone: string;
  email: string;
  experience: string;
  selectedSkills: string[];
  selectedLanguages: selectedLanguage[];
}

const missionData = ref<mission[]>([])

function wordLimit (word: string) {
  if (word.length > 200) return `${word.substring(0, 200)}...`
  return word
}

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    missionData.value.push({
      missionName: '測試'+ i,
      startday: '2024/10/10',
      endday: '2024/10/15',
      type: '',
      currency: '',
      money: '15000',
      location: '基隆市安樂區基金一路135巷21弄71號4樓',
      userName: 'jasper',
      phone: '0912345678',
      email: '132@gmail.com',
      experience: `[求學生涯]



大學期間學習資料庫設計、演算法、資料結構、手機App程式開發等課程，其中對於App開發特別感興趣，畢業專題也使用Java開發五將棋遊戲Android App。

大三開始參加ITSA大專程式競賽，透過解題培養寫程式的思路邏輯，並且逐漸熟練基礎語法。



碩一在老師的推薦下參加中華電信IOT大平台應用競賽，並以路平偵測App入圍全國決賽，此App使用手機內建的三軸加速度感測器紀錄路面的顛簸程度，即時上傳至中華電信IOT雲端儲存平台，提供用戶查詢附近路況，減少因路面不平而受傷的風險。



碩二時除了開始寫論文，也在歐格電子兼職擔任Android App工程師，工作內容包含UI介面、藍芽連接接收數據資料，讓我提前體驗真正職場上的開發流程，以及如何與人協同作業。



畢業論文使用了Python開發籃球戰術辨識系統，該系統先以影像處理技術偵測球場的中場線自動剪輯出左右半場的比賽片段，再以影像辨識模型Yolov3框出球員位置並描繪出軌跡，最後戰術軌跡圖透過卷積神經網路訓練，得到戰術分類的結果。



畢業前夕開始規劃未來的職涯發展方向，覺得網站開發職缺較豐富，除了前後端開發也有雲端、運維等等，最後決定以Java後端開發做為發展方向。



[工作經歷]



畢業後第一份工作在思納捷科技擔任Java後端工程師，
負責API開發，偶爾支援前端畫面，還有一些網站的bug修正。在入職前，我並未碰過現今主流Java網站開發框架Spring Boot，因此是邊工作邊學，並且利用下班空閒時間精進自己，可以獨立完成主管交付的開發項目，有不懂的地方會積極的請教前輩或是找資源學習。



在悅慶資訊經歷了兩個專案，第一個主要負責醫療相關報表的API，因為查詢資料的欄位較多，讓我對SQL子查詢有了更進一步的磨練機會。另一個專案負責檔案查詢API、驗證檔案資料以及定時排程處理資料...等等。在職期間用過Angular調整前端畫面，開始對響應式網頁產生興趣並且利用下班時間自學。



目前在聰泰科技擔任網頁工程師，以Vue開發響應式網頁畫面，會與設計師討論畫面排版以及如何優化使用者體驗。`,
      selectedSkills: [
        '影片剪輯',
        '企劃行銷',
        '企劃行銷',
        '企劃行銷'
      ],
      selectedLanguages: [
        {
          lan: '日文',
          level: '中等'
        },
        {
          lan: '中文',
          level: '精通'
        },
        {
          lan: '英文',
          level: '精通'
        }
      ]
    })
  }
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.listContainer {
  display: flex;
  flex-direction: column;
  margin: 1rem auto 1rem auto;
  width: 60%;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  border: 1px lightgrey solid;
  border-radius: 5px;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.1), /* 左下角陰影 */
    5px 5px 5px rgba(0, 0, 0, 0.1); /* 右下角陰影 */

  .el-form {
    width: 100%;

    :deep(.el-form-item__content) {
      justify-content: center;
    }

    /* .formSubTitle {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .formSubTitle:not(:first-child){
      margin-top: 2rem;
    } */

    .formInput {
      margin-bottom: 1.75rem;

      :deep(.el-input) {
        width: 100%;
      }

      :deep(.el-input__wrapper) {
        padding: 0;
        border-radius: 15px;
        overflow: hidden;
      }

      :deep(.el-input__inner) {
        height: 2.25em;
        font-size: 1.125rem;
        padding: 2px 11px;;

        &::placeholder {
          text-align: left;
        }
      }
    }

    .formBtn {
      margin-top: 1.75rem;
      button {
        font-size: 1.125rem;
        padding: 1.125rem 1.5rem;
        border-radius: 10px;
      }
    }
  }
}

@media screen and (max-width: 760px) {
  .listContainer {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: 1.5rem 2rem 1rem;
  color: #000;

  .el-form {
    width: 100%;

    :deep(.el-form-item__content) {
      justify-content: center;
    }

    /* .formSubTitle {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .formSubTitle:not(:first-child){
      margin-top: 2rem;
    } */

    .formInput {
      margin-bottom: 1.75rem;

      :deep(.el-input) {
        width: 100%;
      }

      :deep(.el-input__wrapper) {
        padding: 0;
        border-radius: 15px;
        overflow: hidden;
      }

      :deep(.el-input__inner) {
        height: 2.25em;
        font-size: 1.125rem;
        padding: 2px 11px;;

        &::placeholder {
          text-align: left;
        }
      }
    }

    .formBtn {
      margin-top: 1.75rem;
      button {
        font-size: 1.125rem;
        padding: 1.125rem 1.5rem;
        border-radius: 10px;
      }
    }
  }
}
}
</style>
