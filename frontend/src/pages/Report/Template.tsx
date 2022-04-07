import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import regular from "../../assets/Arimo-Regular.ttf";
import bold from "../../assets/Arimo-Bold.ttf";

type Props = {
  title: string;
  content: string;
  name: string;
  organizer: string;
  date: string;
  venue: string;
  isPhoto: boolean;
  photo: any;
  tentative: any;
  ajk: any;
};

export const Template = (props: Props) => {
  Font.register({
    family: "Arimo",
    fonts: [
      { src: regular, fontWeight: 400 },
      { src: bold, fontWeight: 700 },
    ],
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 40,
      paddingBottom: 40,
      paddingHorizontal: 40,
      backgroundColor: "white",
      fontSize: 12,
      fontFamily: "Arimo",
    },

    logo: {
      width: 200,
      margin: "0 auto",
    },

    title: {
      fontSize: 12,
      textAlign: "center",
      fontFamily: "Arimo",
      marginTop: 20,
      textTransform: "uppercase",
      fontWeight: 700,
    },
    titleDetail: {
      fontSize: 12,
      fontWeight: 700,
      textAlign: "center",
      fontFamily: "Arimo",
    },

    aboutProgram: {
      marginTop: 40,
      fontWeight: 700,
      fontSize: 12,
      textAlign: "left",
      fontFamily: "Arimo",
    },
    aboutContent: {
      marginTop: 10,
      fontWeight: 400,
      textAlign: "left",
      marginLeft: 20,
    },

    content: {
      marginTop: 10,
      fontSize: 12,
      textIndent: 36,
      textAlign: "justify",
      fontFamily: "Arimo",
    },

    signatureContainer: {
      marginTop: 10,
    },

    signatureHeader: {
      fontWeight: 400,
    },

    signatureImage: {
      width: 50,
      height: 50,
      margin: 10,
    },

    name: {
      fontWeight: 700,
    },

    photoContainer: {
      marginTop: 40,
      textAlign: "center",
    },

    image: {
      width: 400,
      height: 250,
      objectFit: "cover",
      margin: "0 auto",
    },

    figure: {
      fontSize: 12,
      marginTop: 5,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },

    table: {
      marginTop: 40,
      width: "100%",
      marginLeft: 40,
    },

    row: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 8,
      paddingBottom: 8,
      marginLeft: 40,
    },

    bold: {
      fontWeight: "bold",
    },
    row1: {
      width: "30%",
    },
    row2: {
      width: "70%",
      flexWrap: "wrap",
    },
    activities: {
      lineHeight: 2,
      marginLeft: 10,
    },
    tableHeading: {
      paddingTop: 10,
      paddingBottom: 10,
    },
  });

  return (
    <>
      <Document>
        <Page size="A4" style={styles.body}>
          <View>
            <Image style={styles.logo} src="/assets/logoPoli.png" />
            <Text style={styles.title}>LAPORAN {props.title}</Text>
            <Text style={styles.titleDetail}>
              JABATAN TEKNOLOGI MAKLUMAT DAN KOMUNIKASI
            </Text>
            <Text style={styles.titleDetail}>
              POLITEKNIK SULTAN MIZAN ZAINAL ABIDIN, DUNGUN TERENGGANU
            </Text>

            <Text style={styles.aboutProgram}>1.0 BUTIRAN PROGRAM</Text>
            <Text style={styles.aboutContent}>
              a) Nama Program : {props.name}
            </Text>
            <Text style={styles.aboutContent}>
              b) Penganjur : {props.organizer}
            </Text>
            <Text style={styles.aboutContent}>c) Tarikh : {props.date.split('-').reverse().join('/')}</Text>
            <Text style={styles.aboutContent}>d) Tempat : {props.venue}</Text>

            <Text style={styles.aboutProgram}>
              2.0 PENGISIAN/PERLAKSANAAN PROGRAM
            </Text>
            {props.content.split("\n").map((text, index) => {
              return (
                <Text key={index} style={styles.content}>
                  {text}
                </Text>
              );
            })}

            <View style={styles.signatureContainer}>
              <Text style={styles.signatureHeader}>Disediakan oleh:</Text>
              <Image
                src="/assets/signature.png"
                style={styles.signatureImage}
              />
              <Text style={styles.name}>(name)</Text>
              <Text style={styles.signatureContainer}>(Jawatan)</Text>
            </View>
          </View>

          {props.isPhoto ? (
            <View break>
              <Text style={styles.aboutProgram}>
                GAMBAR-GAMBAR SEPANJANG AKTIVITI
              </Text>

              {props.photo?.map((img: any, index: number) => {
                return (
                  <View style={styles.photoContainer}>
                    <Image
                      src={`${img.url}`}
                      key={index}
                      style={styles.image}
                    />
                    <Text style={styles.figure}>Rajah {index + 1.0}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {props.tentative.length > 0 ? (
            <View break>
              <Text style={styles.aboutProgram}>TENTATIF PROGRAM</Text>

              <View
                style={[
                  styles.row,
                  styles.bold,
                  styles.table,
                  styles.tableHeading,
                ]}
              >
                <Text style={styles.row1}>MASA</Text>
                <Text style={styles.row2}>AKTIVITI</Text>
              </View>

              {props.tentative.map((row: any, index: number) => {
                return (
                  <View key={index} style={styles.row}>
                    <Text style={styles.row1}>{row.tentative.time}</Text>
                    {row.tentative.activities
                      .split("\n\n")
                      .map((act: string, num: number) => {
                        return (
                          <Text key={num} style={styles.activities}>
                            {act}
                          </Text>
                        );
                      })}
                  </View>
                );
              })}
            </View>
          ) : null}

          {props.ajk.length > 0 ? (
            <View break>
              <Text style={styles.aboutProgram}>JAWATANKUASA</Text>

              <View
                style={[
                  styles.row,
                  styles.bold,
                  styles.table,
                  styles.tableHeading,
                ]}
              >
                <Text style={styles.row1}>JAWATAN</Text>
                <Text style={styles.row2}>NAMA</Text>
              </View>

              {props.ajk.map((row: any, index: number) => {
                return (
                  <View key={index} style={styles.row}>
                    <Text style={styles.row1}>{row.ajk.role}</Text>
                    {row.ajk.names.split("\n\n").map((act: any, num: any) => {
                      return (
                        <Text key={num} style={styles.activities}>
                          {act}
                        </Text>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          ) : null}
        </Page>
      </Document>
    </>
  );
};
