<strong><h1>지하철 실시간 도착정보 모듈<h1></strong>
<h3>* api 사이트 :  https://data.seoul.go.kr/dataList/OA-12764/F/1/datasetView.do </h3>
<h3>* 필수 npm -> xml-js, request</h3>


<h3>[ 기능 ]</h3>
<h4> -> 실시간으로 서울 지하철 도착정보 api 에서 xml형식으로 데이터를 받아와 xml-js 패키지로 json형태로 변환 후 화면에 출력함.</h4>
<h3>[ 해야 할 것 ]</h3>
<h4> -> 현재 간략한 html 코드와 json 데이터를 모듈 본체 파일에 넘기는 과정에 야매 방식이 적용되어 추후 수정 필요.</h4>
<h4> -> xml 데이터를 받아왔을때 새벽에 도착정보가 없는경우 데이터를 받아오지못해 오류가 발생하여 화면이 나오지 않는 현상 수정 필요. </h4>
