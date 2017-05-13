var html = `
<!doctype html>

<head>

</head>
<body >
    <div id="page">
        <div id="04">
            <div>
                <h5>Sat 5/04</h5>
                    <div>
                        <h3>Butter Pecan</h3>
                        <p>A butterscotch flavor and whole roasted pecans</p>
                    </div>
                    <div>
                        <h3>Cherry Cycle</h3>
                        <p>Frosty, wild cherry custard swirled with our rich, creamy vanilla custard. This great flavor in honor of a great hometown company, Harley Davidson.</p>
                    </div>
            </div>
        </div>
        <div id="14">
            <div>
                <h5>Sun 5/14</h5>
                    <div class="col-3">
                        <h3>Mom&#39;s Chocolate Chip Cheesecake</h3>
                        <p>Made with Hershey&#39;s&#174; chocolate chips, cheesecake and custard. Yes, yes,yes!!! Your mom will love it!</p>
                    </div>
                    <div class="col-3">
                        <h3>Apple Pie &#224; la Mode</h3>
                        <p>Apple custard and vanilla custard swirled together, ladles of cinnamon apple chunks and generous pieces of flaky pie crust.</p>
                    </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

var data = { '0': 'Butter Pecan', '1': 'Cherry Cycle'};

exports.html = html;
exports.data = data;