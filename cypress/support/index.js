// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
const cookie='yz_log_ftime=1591608166743; yz_log_uuid=1ac8de05-33c6-0c00-9b9e-c8d9b2120f75; gr_user_id=0351c8d3-73c4-48a5-88cb-16b629d8cf49; _canwebp=1; Hm_lvt_7fff7ceede91c07fb0a2f9c1850d7987=1591668114; grwng_uid=60189426-6953-4b93-987e-d79947dfc36d; rdfp=cb96eaf107555b37ae3634a654920175; KDTSESSIONID=YZ723133235902767104YZMkqua2F5; weixin_server_key=879b5b0cdf25c86ba9b845a08a88b5fa; weixin_oldsub_key=750e51c6ce1e5b2f70245fbbfd49475a; weixin_certsub_key=fc35bf5794942895ab5a6bd9d0e4c989; weixin_menu_key=b4b78717a71da3a8a7a66c5eda82adfd; mp_id=2830600; weixin_subscribe_key=a555c2f88a178736a7c4e2a3baf38651; yz_ep_page_type_track=iDJ3GNJDHbhHtOl6W3j3ZA%3D%3D; country_code=+86; user_weixin=%2B86-18980621880; user_nickname=18980621880; mei_web_csrf=lsMiJ9Fa-a3gP5qHimzK9pI-Ggu3GWYQdYmE; captcha_sid=YZ726859090080509952YZOipRqxK0; mei_h5_csrf_token=L2a7pdzE-aWp8eN4587uu9sUWzdK7bxieFkQ; _kdt_id_=355249; trace_sdk_context_from_source=; trace_sdk_context_ab_test=b; Hm_lvt_7bec91b798a11b6f175b22039b5e7bdd=1592450000,1592473946,1593486075,1593501002; Hm_lpvt_7bec91b798a11b6f175b22039b5e7bdd=1593501002; loc_dfp=becf932b0f9b79561a1242bccda89141; dfp=554982c378e545a31b7984452433f1b4; yz_log_seqb=1593518523468; gr_session_id_767813e963734402a8256e1096b88331=78ea1e25-56d4-4577-88a7-e780b6620ef9; gr_cs1_78ea1e25-56d4-4577-88a7-e780b6620ef9=user_id%3A983319630; gr_session_id_767813e963734402a8256e1096b88331_78ea1e25-56d4-4577-88a7-e780b6620ef9=true; sid=YZ727615121556295680YZJ2c1vTRt; mobile=18980621880; user_id=8105725941; access_token=e5ed4bc013bd588918858921f85e82; team_auth_key=9dcab54f92c8d451e55e8539a7c7d7be; kdt_id=55329256; mei_kdt_id=355249; mei_token=39J9aiuk4wglBS71dDdm56i4MdA45btuN-VlX8wLPCVKNUpo6315E1iW606BMqakgscuxyFE0cpkQGCXVTYXVwESYyp7-1cpRYx7BSNJaIg; deptId=55329256; yzUid=8105725941; yz_log_seqn=19'
const cookieList=cookie.split('; ')
Cypress.Cookies.defaults({//cookie白名单
  whitelist: cookieList.map(v=>v.split('=')[0])
})
