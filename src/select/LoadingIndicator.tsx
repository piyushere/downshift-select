// WIP

function LoadingIndicator() {
  /*
    .css-at12u2-loadingIndicator {
    color: rgb(204, 204, 204);
    display: flex;
    padding: 8px;
    transition: color 150ms ease 0s;
    align-self: center;
    font-size: 4px;
    line-height: 1;
    margin-right: 4px;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
}


.css-19b349s {
    animation: 1s ease-in-out 0ms infinite normal none running animation-stj4i2;
    background-color: currentcolor;
    border-radius: 1em;
    display: inline-block;
    height: 1em;
    vertical-align: top;
    width: 1em;
}
    */
  return (
    <div
      className="text-neutral-300 flex p-2 transition-[color] mr-1 text-center box-border"
      aria-hidden="true"
    >
      <span className="bg-current rounded-full inline-block w-1 self-stretch" />
      <span className="bg-current rounded-full inline-block w-1 self-stretch" />
      <span className="bg-current rounded-full inline-block w-1 self-stretch" />
    </div>
  );
}

export default LoadingIndicator;
