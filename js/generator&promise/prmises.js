function getJSON(url) {

    returnnewPromise((resolve, reject) => {

            constrequest = newXMLHttpRequest();
            request.open("GET", url);
            request.onload = function () {
                try {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(this.status + "" + this.statusText);
                    }
                } catch (e) {
                    reject(e.message);
                }
                request.onerror = function () {
                    reject(this.status + "" + this.statusText);
                };
                request.send();
            }
        });
    };

    getJSON("data/ninjas.json").then(ninjas => {
        assert(ninjas !== null, "Ninjasobtained!");
    }).catch(e => fail("Shouldn'tbehere:" + e));