import getDictionary from "@/utils/getDictionary.ts";

export default function () {
	// API_HOST_SLAVE
  //getDictionary(process.env.API_HOST_SLAVE+"city/").then(
	getDictionary(process.env.API_HOST_SLAVE+"https://api.slave.zimmer-im-revier.de/city/").then(
    (res) => {


//console.log('res.data.data:', res.data.data);
//console.log('res.data:', res.data);


      sessionStorage.setItem("dictionary", JSON.stringify(res.data.data));
      this.$store.commit(
        "dictionaryOrte/setDictionaryOrte",
        res.data.data
      );
      document.cookie = `dictionaryOrte=${res.data.data}`;
      document.cookie = `user=${JSON.stringify(
        res.data.data
      )}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
    }
  );
}
