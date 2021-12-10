// ====================================================================
// ====================================================================
// ====================================================================
/*
===================== ///////// <--------->
======== <---------> ///////// =====================>
=========  <---------> Unit Testing OF User APIs <---------> /////////=====>
===================== ///////// <---------> =
======= <---------> ///////// =====================>
*/
// ==================================================================
// ==================================================================
// ==================================================================


/* ====================== /// <==> Variables Declaration <==>
========= */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../script');
const userServices = require('../Modules/Users/Controller/services');
const {expect} = require('chai');

// const connect = require('../Configurations/configuration');

chai.should();
chai.use(chaiHttp);
/* =========== /// <==> End <==> ===========*/


/* =======================================*/
/* ==============================================
===============*/
/* ====================== /// <==> Unit Testing <==> /// =
==== */
/* ========================================================
=====*/
/* =======================================*/

describe('User APIs', () => {
/*
 ///////// <---------> ======== <---------> ///////// =====================>
 ///////// <---------> Check Mail <---------> ///////// =====================>
 ///////// <---------> ======== <---------> ///////// =====================>
*/

  describe('Check Mail Function', () => {
    // ----------------// <=====> 1-Case <=====> //----------------//
    it('It Should Return True', (done) => {
      const email = 'ahmed0@gmail.com';
      userServices.checkMail(email).then((result)=>{
        expect(result).to.be.eq(true);
        done();
      }).catch(done);
    });

    it('It Should Return False', (done) => {
      const email = 'Afnan@gmail.com';
      userServices.checkMail(email).then((result)=>{
        expect(result).to.be.eq(false);
        done();
      }).catch(done);
    });
  });

  // ----------------// <=====> 2-Case <=====> //----------------//
});
/* =========== /// <==> End <==> ===========*/
