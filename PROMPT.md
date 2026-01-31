@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-418&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-481&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-455&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-492&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-503&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-468&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-514&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-525&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-536&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-547&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-558&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-569&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-580&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-591&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-602&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-613&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-431&m=dev

@https://www.figma.com/design/0hYHEQ8VKrGOMIK85QJlf0/Untitled?node-id=10-444&m=dev

---

위에 있는 각각의 디자인에는 노래와 노래의 응원법 정보가 있어. 이 정보들을 바탕으로 다음과 같은 규칙에 따라 json 파일을 작성해줘.

```
// sungkyu-chants.json
[
    {
        "title": "Kontrol",
        "is_fanchat": true
        "aliases": ["컨트롤", "kontrol"],
        "chant": "너의 그 자린 항상 늘 그대로일 테니까 [[김성규!]]\n혹시라도 내가 다시 그리워지면\n아무런 걱정하지 말고 다시 내게로 <<오 오 오>>"
    },
    {
        "title": "어떤 노래 제목",
        "is_fanchat": false
        "aliases": ["별칭1", "별칭2"],
        "chant": "응원법 텍스트..."
    }
]
```

1. title: 최상단에 있는 노래 제목을 그대로.
2. is_fanchat: 최상단 노래 제목 옆에 '응원법'이라고 되어 있으면 true, '떼창곡' 이라고 되어 있으면 false.
3. aliases: 일단 생성만 하고 비워둬.
4. chant: 하단에 있는 가사들을 그대로 적어줘. 이때, 가사에 있는 줄바꿈을 그대로 \n로 적용해줘. **그리고 노란색으로 되어 있는 부분은 '<<>>'로 감싸서, 파란색으로 되어 있는 부분은 '[[]]'로 감싸서 적용해줘.**
5. 파일은 프로젝트 루트에 저장해줘.