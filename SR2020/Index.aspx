<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="SR2020.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link type="text/css" rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link type="text/css" href="bootstrap.css" rel="stylesheet" />
    <link type="text/css" href="Stylesheets/MobileStyles.css" rel="stylesheet" media="screen and (max-width: 500px)" />
    <link type="text/css" href="Stylesheets/Styles.css" rel="stylesheet" media="screen and (min-width: 500px)" />
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="LoginBody">
                <div class="LoginContainer">

                    <div class="Login">
                        <asp:Label ID="LabelLoginName" runat="server" Text="Brugernavn:"></asp:Label>
                        <input id="Uname" name="Uname" placeholder="Username" runat="server" class="form-control" />
                    </div>
                    <div class="Login">
                        <asp:Label ID="LabelLoginPassword" runat="server" Text="Password:"></asp:Label>
                        <input id="Pword" name="Pword" placeholder="Password" type="password" runat="server" class="form-control" />
                    </div>

                    <div class="Login">
                        <asp:Button CssClass="nav-link btn btn-success" OnClick="Login" ID="LoginButton" runat="server" Text="LOGIN"></asp:Button>
                    </div>

                    <div class="HyperTextLogin">
                        <p><a href="#" class="btn btn-primary">Forgotten password?</a></p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
