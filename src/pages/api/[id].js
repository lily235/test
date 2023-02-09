import { urlMappings } from '../../app/page.js';

export default function handler(req, res) {
  const { method, query } = req;
  console.log("Hello");

  //   switch (method) {
  //     case "GET":
  //       res.statusCode = 302;

  //       res.setHeader(
  //         "Location",
  //         urlMappings.find(
  //           (element) =>
  //             element.shorturl === "http://localhost:3000/api/" + query.id
  //         ).url
  //       );
  //   }
  console.log(urlMappings.length);

  res.end(query.id);
}
