﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SPA.aspx.cs" Inherits="SR2020.SPA" %>

<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" charset="utf-8">
    <title>Login Page</title>
    <link type="text/css" rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link type="text/css" href="bootstrap.css" rel="stylesheet" />
    <link type="text/css" href="Stylesheets/MobileStyles.css" rel="stylesheet" media="screen and (max-width: 500px)" />
    <link type="text/css" href="Stylesheets/Styles.css" rel="stylesheet" media="screen and (min-width: 500px)" />
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <script type="text/javascript" src="Scripts/TokenScript.js"></script>
    <script type="text/javascript" src="Scripts/ApiCall.js"></script>
    <script type="text/javascript" src="Scripts/TimerTest.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
    <script type="text/javascript" src="Scripts/spa.js"></script>
    <script type="text/javascript" src="Scripts/JSCase.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap.js"></script>
    <!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">-->
</head>
<body>
    <!--navigation bar-->
    <!--<nav class="navbar navbar-inverse">-->
    <div class="w3-bar">
        <a href="#" class="w3-bar-item w3-button" id="LogoArea">
            <img src="Images/SRO-header-logo-vektor.svg" id="SchmidtsRadioLogo" />
        </a>
        <div class="w3-dropdown-hover w3-right" id="DropDownBtn">
            <button class="w3-button navbar-color" id="DropdownNav">
                <h3><i class="fa fa-bars" aria-hidden="true"></i></h3>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-card-4 navbar-color" id="DropdownBox" style="right: 0">
                <a href="#" class="w3-bar-item w3-button">Link 1</a>
                <a href="#" class="w3-bar-item w3-button">Link 2</a>
                <a href="#" class="w3-bar-item w3-button">Link 3</a>
            </div>
        </div>
    </div>
    <div id="casesHeader">
        <h1 id="caseHeading">CASES</h1>
        <div>
            <!--<div><input type="checkbox" name="mostImportenColor" value="mostImportenColor" id="mostImportenColor" /><label for="mostImportenColor">Mest vigtigte farve</label></div>-->
            <!--<div><input type="checkbox" name="LeastImportenColor" value="LeastImportenColor" id="LeastImportenColor" /><label for="LeastImportenColor">Mindst vigtigte farve</label></div>-->
            <div class="CheckboxSorting form-check form-check-inline">
                <input type="checkbox" name="ColorId" value="Green" id="Green" class="form-check-input" />
                <label class="form-check-label" for="Green">GRØN</label>
            </div>
            <div class="CheckboxSorting form-check form-check-inline">
                <input type="checkbox" name="ColorId" value="Red" id="Red" class="form-check-input" />
                <label for="Red" class="form-check-label">RØD</label>
            </div>
            <div class="CheckboxSorting form-check form-check-inline">
                <input type="checkbox" name="ColorId" value="Yellow" id="Yellow" class="form-check-input" />
                <label for="Yellow" class="form-check-label">GUL</label>
            </div>
            <div class="CheckboxSorting form-check form-check-inline">
                <input type="checkbox" name="ColorId" value="Blue" id="Blue" class="form-check-input" />
                <label for="Blue" class="form-check-label">BLÅ</label>
            </div>
            <div class="CheckboxSorting form-check form-check-inline">
                <input type="checkbox" name="alphabeticalOrder" value="alphabeticalOrder" id="alphabeticalOrder" onchange="doalert(this)" class="form-check-input" />
                <label for="alphabeticalOrder" class="form-check-label">ALFABETISK</label>
            </div>
        </div>
    </div>
    <div class="CasesContainer">
        <button class="collapsible">
            <div class="ColorBox" id="Red"></div>
            <div class="collapseableCaseName">
                <p class="StandName">STANDER:</p>
                <p class="StandName">L85A-DK</p>
            </div>
            <div class="collapseableTimer">02:00:00</div>
        </button>
        <div class="content">
            <p>Kunde navn: Netto</p>
            <textarea class="collapseableCommentArea form-control" rows="3" placeholder="Opgave beskrivelse" readonly></textarea>
            <div class="collapseableButtonAndStatus">
                <p class="lastStatus">Sidste status: 14:58</p>
                <button class="btn btn-primary caseButton">OPDATER</button>
                <button class="btn btn-success caseButton">AFSLUT</button>
            </div>
        </div>
        <button class="collapsible">
            <div class="ColorBox" id="Green"></div>
            <div class="collapseableCaseName">
                <p class="StandName">STANDER:</p>
                <p class="StandName">L85A-DK</p>
            </div>
            <div class="collapseableTimer">02:00:00</div>
        </button>
        <div class="content">
            <p>Kunde navn: GLAS MADS</p>
            <p>Tlf:+45 8765 4321</p>
            <textarea class="collapseableCommentArea form-control" rows="3" placeholder="Opgave beskrivelse" readonly></textarea>
            <div class="collapseableButtonAndStatus">
                <p class="workerOnCase">På casen: Claus</p>
                <button class="btn btn-primary caseButton">OPDATER</button>
                <button class="btn btn-success caseButton">AFSLUT</button>
            </div>
        </div>
        <button class="collapsible">
            <div class="ColorBox" id="Yellow"></div>
            <div class="collapseableCaseName">
                <p class="StandName">L85A-DK</p>
            </div>
            <div class="collapseableTimer">02:00:00</div>
        </button>
        <div class="content">
            <p>Kunde navn: LIDL</p>
            <p>Tlf:+45 2588 5246</p>
            <textarea class="collapseableCommentArea form-control" rows="3" placeholder="Opgave beskrivelse" readonly></textarea>
            <div class="collapseableButtonAndStatus">
                <p class="workerOnCase">På casen: Lars</p>
                <button class="btn btn-primary caseButton">OPDATER</button>
                <button class="btn btn-success caseButton">AFSLUT</button>
            </div>
        </div>
        <button class="collapsible">
            <div class="ColorBox" id="Blue"></div>
            <div class="collapseableCaseName">
                <p class="StandName">L85A-DK</p>
            </div>
            <div class="collapseableTimer">02:00:00</div>
        </button>
        <div class="content">
            <p>Kunde navn: Netto</p>
            <textarea class="collapseableCommentArea form-control" rows="3" placeholder="Opgave beskrivelse" readonly></textarea>
            <div class="collapseableButtonAndStatus">
                <p class="lastStatus">Sidste status: 14:58</p>
                <button class="btn btn-primary caseButton">OPDATER</button>
                <button class="btn btn-success caseButton">AFSLUT</button>
            </div>
        </div>
    </div>

    <div>
        <div class="container-Edit">
            <div class="test2">
                <div class="CreateFormHeading">
                    <h1 class="CreaterHeading">OPRET STANDER</h1>
                </div>
                <form class="CreaterForm">
                    <div class="CreateFormSpacing">
                        <label>Stander navn:</label><br />
                        <input id="stand" placeholder="Stander navn" class="form-control" />
                    </div>

                    <div class="CreateFormSpacing">
                        <label>Kontakt person:</label><br />
                        <input id="owner" placeholder="Kontakt person" class="form-control" />
                    </div>

                    <div class="CreateFormSpacing">
                        <label>Telefonnummer:</label><br />
                        <input id="phone" placeholder="Tlf nr" class="form-control" />
                    </div>

                    <button onclick="return PostStand()" class="btn btn-success CreateFormSpacingButton">Opret</button>
                </form>
            </div>
        </div>
    </div>


    <div>
        <div class="container-Edit">
            <div class="test2">
                <div class="CreateFormHeading">
                    <h1 class="CreaterHeading">OPRET CASE</h1>
                </div>
                <form class="CreaterForm">
                    <div class="CreateFormSpacing">
                        <label>Stander navn:</label><br />
                        <select id="choseStands" name="choseStands" class="form-control">
                        </select>
                    </div>

                    <div class="CreateFormSpacing">
                        <label>Vælg farve:</label><br />
                        <div class="form-control" id="NoColor" onclick="OpenModal()"></div>
                    </div>

                    <div class="CreateFormSpacing">
                        <label>Case beskrivelse:</label><br />
                        <textarea id="description" class="form-control" placeholder="Beskrivelse"></textarea>
                    </div>

                    <button onclick="PostCase()" class="btn btn-success CreateFormSpacingButton">Udfør</button>
                </form>
            </div>
        </div>
    </div>
    <div class="modal" id="myModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <label>Vælg hvilken farve det skal være</label><br />
            <div id="ModalColorBoxContainer">
                <div class="ColorBox ModalColorBox" id="Red" onclick="Red()"></div>
                <div class="ColorBox ModalColorBox" id="Yellow" onclick="Yellow()"></div>
                <div class="ColorBox ModalColorBox" id="Green" onclick="Green()"></div>
                <div class="ColorBox ModalColorBox" id="Blue" onclick="Blue()"></div>
            </div>
        </div>
    </div>
    <script src="Scripts/CaseCreation.js"></script>
    <script src="Scripts/StylingsJavaScript.js"></script>
    <script src="Scripts/OpenChoseColor.js"></script>
    <script src="Scripts/ChoseColor.js"></script>
    <script src="Scripts/Sorting.js"></script>
</body>
</html>
