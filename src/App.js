import "./styles.css"
import { useState } from "react"
import { Chart } from "react-google-charts"
import { Typography, Collapse, IconButton } from "@material-ui/core"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import data from "./timelines.json"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

export default function App() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" style={{ marginBottom: 0 }}>
        Comparative Historical Timelines by Country
      </Typography>
      <Typography
        variant="body1"
        style={{ marginBottom: 20, fontSize: 12, color: "#666" }}
      >
        data source: Wikipedia.com
      </Typography>
      <div
        style={{
          // width: "100vw",
          overflow: "auto"
        }}
      >
        <Chart
          width={10000}
          height={600}
          data={data?.map((item, i) => [
            item?.country,
            item?.title,
            new Date(item?.startYear, 0, 1),
            new Date(item?.endYear, 0, 1)
          ])}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          options={{
            timeline: {
              colorByRowLabel: false,
              rowLabelStyle: {
                fontName: "Helvetica",
                fontSize: 16,
                color: "#333"
              },
              barLabelStyle: { fontName: "Helvetica", fontSize: 12 }
            }
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>

      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography>References:</Typography>
        <ol>
          {data?.map((item) => {
            return (
              <li style={{ marginBottom: 5 }}>
                <a
                  style={{ color: "#119DA4" }}
                  rel="noreferrer"
                  target="_blank"
                  href={item?.link ? item?.link : null}
                >
                  {item?.title}
                </a>
              </li>
            )
          })}
          {/* <li style={{ marginBottom: 5 }}>
            <a
              href="https://en.wikipedia.org/wiki/History_of_Japan"
              style={{ color: "#119DA4" }}
              rel="noreferrer"
              target="_blank"
            >
              https://en.wikipedia.org/wiki/History_of_Japan
            </a>
          </li>
          <li style={{ marginBottom: 5 }}>
            <a
              href="https://en.wikipedia.org/wiki/History_of_China"
              style={{ color: "#119DA4" }}
              rel="noreferrer"
              target="_blank"
            >
              https://en.wikipedia.org/wiki/History_of_China
            </a>
          </li>
          <li style={{ marginBottom: 5 }}>
            <a
              href="https://en.wikipedia.org/wiki/History_of_Korea"
              style={{ color: "#119DA4" }}
              rel="noreferrer"
              target="_blank"
            >
              https://en.wikipedia.org/wiki/History_of_Korea
            </a>
          </li> */}
        </ol>
      </Collapse>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}))
