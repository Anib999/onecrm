import { message } from 'antd'

const catchErrors = (errors, apiName) => {
  console.log('error caught in catch block', errors, apiName)
  message(errors?.message ?? 'Something went wrong')
}

export default catchErrors;