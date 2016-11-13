import "./style.css";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {push} from "react-router-redux";
import {logout} from "commons/auth";
import Helmet from "react-helmet";
import {Triptych} from "triptych";

import Headroom from 'react-headrooms'

import moment from "moment";
import "moment/locale/ru"

moment.locale('ru')

const mapStateToProps = (state) => ({
  title: state.page.title,
  meta: (state.page.meta || []).concat([
    {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"}
  ]),
  link: (state.page.link || []).concat([
    {rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Istok+Web|Lora|Oranienbaum",type:"text/css"},
    {rel:"stylesheet",href:"/bundle.css",type:"text/css",media:"screen,projection"},
    {rel:"icon",type:"image/png",sizes:"192x192",href:"/assets/favicon/android-icon-192x192.png"},
    {rel:"icon",type:"image/png",sizes:"32x32",href:"/assets/favicon/favicon-32x32.png"},
    {rel:"icon",type:"image/png",sizes:"96x96",href:"/assets/favicon/favicon-96x96.png"},
    {rel:"icon",type:"image/png",sizes:"16x16",href:"/assets/favicon/favicon-16x16.png"}
  ]),
  user: state.auth.user
})

export default connect(mapStateToProps)(({title, link, meta, user, children}) =>
  <div>
    <Helmet
      title={title}
      defaultTitle="Мирари"
      link={link}
      meta={meta}
    />

    <Headroom tolerance={5} offset={200} classes={{
      initial: 'headroom',
      pinned: 'is-scrollUp',
      unpinned: 'is-scrollDown'
    }}
    >
      <div className="ExpHeader">
        <div className="ExpHeader-natural">
          <div className="ExpHeader-container">
            <div className="ExpHeader-item">
              <a className="ExpHeader-itemLink" href="#">К контексту</a>
            </div>
            <div className="ExpHeader-item--divider"/>
            <div className="ExpHeader-item ExpHeader-logo">
              <Link to="/" className="ExpHeader-itemLink ExpHeader-logoLink">
                <svg className="ExpHeader-logoIcon" viewBox="0 0 144 144">
                  <path d="M99.0000011,5.23365386 C90.6621179,1.85856437 81.5481044,0 72,0 C62.4518956,0 53.3378821,1.85856437 44.9999989,5.23365386 L45,24.0722737 C52.9757653,19.5694753 62.1878161,17 72,17 C81.8121839,17 91.0242347,19.5694753 99,24.0722737 L99,5.23364649 Z M123,21.176776 C135.97753,34.1991633 144,52.1627075 144,72 C144,91.8372925 135.97753,109.800837 123,122.823224 L123,92.6301138 C125.579503,86.2595105 127,79.2956426 127,72 C127,64.7043574 125.579503,57.7404895 123,51.3698862 L123,21.176776 Z M99.0000011,138.766346 C90.6621179,142.141436 81.5481044,144 72,144 C62.4518956,144 53.3378821,142.141436 44.9999989,138.766346 L45,119.927726 C52.9757653,124.430525 62.1878161,127 72,127 C81.8121839,127 91.0242347,124.430525 99,119.927726 L99,138.766354 Z M21,21.176776 C8.02246962,34.1991633 0,52.1627075 0,72 C0,91.8372925 8.02246962,109.800837 21,122.823224 L21,92.6301138 C18.4204966,86.2595105 17,79.2956426 17,72 C17,64.7043574 18.4204966,57.7404895 21,51.3698862 L21,21.176776 Z M57,56 L89,56 L89,88 L57,88 L57,56 Z" fill="#000000" />
                </svg>
              </Link>
            </div>
            <div className="ExpHeader-item--divider"/>
            <div className="ExpHeader-item">
              <a className="ExpHeader-itemLink" href="#">Стать участником | Вход</a>
            </div>
          </div>
        </div>
        <div className="ExpHeader-substitute" />
      </div>
    </Headroom>

    {children || <ExperimentalContent />}

  </div>
);

const ExperimentalContent = () =>
  <div className="ExpApp">
    <div className="ExpApp-container">
      <article className="ExpArticle">
        <div className="ExpArticle-header">
          <h1 className="ExpArticle-headerTitle">Космический спектральный класс глазами современников</h1>
        </div>
        <div className="ExpArticle-credits">
          <a href="/???">Вася Пупкин</a>, {moment(new Date(Math.PI * (10**10)*400)).fromNow()}, (<span title="Кол-во просмотров, глаз">г</span>) 33 (<span title="Кол-во комментов">к</span>) 1
        </div>
        <div className="ExpArticle-body">
          <p>У планет-гигантов нет твёрдой поверхности, таким образом экскадрилья существенно меняет далекий надир. В отличие от давно известных астрономам планет земной группы, популяционный индекс ищет pадиотелескоп Максвелла. Зенит притягивает экваториальный метеорный дождь. Соединение, сублимиpуя с повеpхности ядpа кометы, представляет собой натуральный логарифм (расчет Тарутия затмения точен - 23 хояка 1 г. II О. = 24.06.-771).</p>
          <p>Планета пространственно дает pадиотелескоп Максвелла. Атомное время, оценивая блеск освещенного металического шарика, иллюстрирует вращательный популяционный индекс, об интересе Галла к астрономии и затмениям Цицерон говорит также в трактате "О старости" (De senectute). Скоpость кометы в пеpигелии, в первом приближении, представляет собой метеорный дождь. Даже если учесть разреженный газ, заполняющий пространство между звездами, то все равно перигей меняет космический мусор. Туманность Андромеды решает первоначальный поперечник.</p>
          <p>Зоркость наблюдателя, следуя пионерской работе Эдвина Хаббла, выбирает Ганимед. Аргумент перигелия, по определению, гасит близкий параметр. Магнитное поле гасит непреложный сарос, об интересе Галла к астрономии и затмениям Цицерон говорит также в трактате "О старости" (De senectute). Декретное время однородно гасит вращательный часовой угол. Многие кометы имеют два хвоста, однако возмущающий фактор гасит параллакс. Узел отражает случайный Тукан.</p>
          <p>Дип-скай объект, а там действительно могли быть видны  звезды, о чем свидетельствует Фукидид прочно решает близкий нулевой меридиан. Комета Хейла-Боппа, в первом приближении, колеблет эллиптический космический мусор, а время ожидания ответа составило бы 80 миллиардов лет. Эксцентриситет притягивает экваториальный pадиотелескоп Максвелла. В отличие от давно известных астрономам планет земной группы, эклиптика дает астероидный спектральный класс. Афелий , а там действительно могли быть видны  звезды, о чем свидетельствует Фукидид решает эксцентриситет.</p>
          <p>Солнечное затмение пространственно гасит эллиптический Тукан. В связи с этим нужно подчеркнуть, что движение мгновенно. Пpотопланетное облако точно дает центральный Тукан. Красноватая звездочка возможна. Апогей дает перигей, тем не менее, уже 4,5 млрд лет расстояние нашей планеты от Солнца практически не меняется. Весеннее равноденствие, сублимиpуя с повеpхности ядpа кометы, вращает близкий надир.</p>
          <p>По космогонической гипотезе Джеймса Джинса, математический горизонт теоретически возможен. Кульминация, следуя пионерской работе Эдвина Хаббла, перечеркивает эллиптический терминатор. Радиант, как бы это ни казалось парадоксальным, пространственно вращает центральный возмущающий фактор. Комета возможна.</p>
        </div>
      </article>
    </div>
    <div className="Interaction">
      <div className="Interaction-container">
        <div className="Interaction-title">Давайте взаимодействовать</div>
        <div className="Interaction-list">
          <div className="Interaction-item">
            <button>Обсудить</button><br/>
            <small>Будьте первым!</small>
          </div>
          <div className="Interaction-item">
            <button>Подписаться</button> <br/>
            <small>На новые работы автора, через Telegram или email</small>
          </div>
          <div className="Interaction-item">
            <button>Стать участником</button><br/>
            <small>Как автор, читатель, держатель инициативы</small>
          </div>
        </div>
      </div>      
    </div>
  </div>
