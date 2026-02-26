현재 매시 5분마다 음원 차트 순위와 유튜브 영상 조회수를 크롤링해서 JSON 형식으로 Redis에 저장하고 있어.
이 정보를 바탕으로 크롤링이 끝난 직후 트위터(X)에 자동으로 현재 순위 정보를 게시하려고 해.
깊게 생각한 후 다음의 내용들을 모두 정확하게 반영해서 구현해줘.

# 1. 저장되는 JSON 데이터 예시
```json
{
  "updated_at": "2026-02-24 20:28",
  "charts": [
    {
      "chart_name": "멜론 TOP 100",
      "artist_ranks": [
        {
          "rank": 5,
          "title": "사랑하게 될 거야",
          "artist": "김성규"
        },
        {
          "rank": 7,
          "title": "0+0",
          "artist": "김성규"
        }
      ]
    },
    {
      "chart_name": "멜론 HOT 100(30일)",
      "artist_ranks": []
    },
    {
      "chart_name": "멜론 HOT 100(100일)",
      "artist_ranks": []
    },
    {
      "chart_name": "지니 TOP 200",
      "artist_ranks": [
        {
          "rank": 5,
          "title": "사랑하게 될 거야",
          "artist": "김성규"
        },
        {
          "rank": 10,
          "title": "0＋0",
          "artist": "김성규"
        },
        {
          "rank": 112,
          "title": "입춘",
          "artist": "김성규"
        }
      ]
    },
    {
      "chart_name": "벅스",
      "artist_ranks": [
        {
          "rank": 6,
          "title": "사랑하게 될 거야",
          "artist": "김성규"
        },
        {
          "rank": 9,
          "title": "0+0",
          "artist": "김성규"
        },
        {
          "rank": 93,
          "title": "입춘",
          "artist": "김성규"
        }
      ]
    },
    {
      "chart_name": "플로",
      "artist_ranks": [
        {
          "rank": 5,
          "title": "사랑하게 될 거야",
          "artist": "김성규"
        },
        {
          "rank": 12,
          "title": "0+0",
          "artist": "김성규"
        },
        {
          "rank": 89,
          "title": "입춘",
          "artist": "김성규"
        }
      ]
    },
    {
      "chart_name": "바이브 Top 100",
      "artist_ranks": [
        {
          "rank": 7,
          "title": "사랑하게 될 거야",
          "artist": "김성규"
        },
        {
          "rank": 18,
          "title": "0+0",
          "artist": "김성규"
        }
      ]
    },
    {
      "chart_name": "바이브 국내 급상승",
      "artist_ranks": []
    }
  ],
  "youtube": [
    {
      "id": "AdOaQpwYx0c",
      "title": "[Official Video] 김성규 (KIM SUNG KYU) 'Over It' Pre-Release",
      "viewCount": 968741
    }
  ]
}
```

# 2. 포스팅되는 트윗 형식
```
YYYY.MM.DD N시
김성규 #곡명_띄어쓰기는_하이픈으로 음원 차트 순위

${차트명} ${순위(순위 정보가 있으면 N위, 차트 아웃이라 정보 없으면 - 표시)} (${순위 변동 (전 시간 차트에 비해 N위 상승했으면 🔺N, N위 하락했으면 🔻N, 전 시간이나 현 시간 차트 정보가 없어 알 수 없으면 - 표시)})
${차트명} ${순위(순위 정보가 있으면 N위, 차트 아웃이라 정보 없으면 - 표시)} (${순위 변동 (전 시간 차트에 비해 N위 상승했으면 🔺N, N위 하락했으면 🔻N, 전 시간이나 현 시간 차트 정보가 없어 알 수 없으면 - 표시)})
${차트명} ${순위(순위 정보가 있으면 N위, 차트 아웃이라 정보 없으면 - 표시)} (${순위 변동 (전 시간 차트에 비해 N위 상승했으면 🔺N, N위 하락했으면 🔻N, 전 시간이나 현 시간 차트 정보가 없어 알 수 없으면 - 표시)})
...

MV nn,nnn,nnn회

#김성규 #KIMSUNGKYU #OFFTHEMAP
```

## 트윗 예시
```
2026.02.23 7시
김성규 #Over_it 음원 차트 순위

멜론 TOP 100 -
멜론 HOT 100(30일) 39위 (🔺5)
멜론 HOT 100(100일) 96위 (🔻8)
지니 TOP 200 -
지니 (발매30일) 38위(-)
지니 (발매100일) 80위(-)
벅스 -
플로 -
바이브 국내급상승 -

MV 564,654회

#김성규 #KIMSUNGKYU #OFFTHEMAP
```

# 3. 유의사항
a. 하나의 차트에 여러 곡이 차트인해 있더라도 타이틀곡 정보만 포스트할 거야. 유튜브 영상 조회수도 title 문자열에 타이틀곡명이 포함되어 있는 거 하나만 찾아서 viewCount 값을 가져오면 돼.
타이틀곡은 일단 Over it으로 설정해줘.

b. 트위터 포스팅 api 스펙은 https://docs.x.com/x-api/posts/create-or-edit-post 이 페이지 내용을 참고해. api키 등 인증 정보는 추후에 설정할 테니까 일단 임의의 값으로 둬줘.

c. 차트 데이터(json)는 charts:history에서 볼 수 있어.

d. lib와 api 폴더 하위에 있는 파일 내용들을 참고해.