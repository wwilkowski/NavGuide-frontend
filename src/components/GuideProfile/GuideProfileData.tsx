import React, { useState, useEffect } from 'react';
import { IGuideProfileDataProps } from '../../containers/GuideProfile/types';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import poland from '../../assets/icons/poland.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
  },
  avatar: {
    width: '140px',
    height: '140px',
  },
  mainInfo: {
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
  flag: {
    height: '75%',
    padding: '0 0.2rem',
  },

  text: {
    color: theme.palette.text.primary,
  },
}));

const GuideProfileData = (props: IGuideProfileDataProps) => {
  const { profileData, profile } = props;

  const classes = useStyles();

  const { t } = useTranslation();

  const [experience, setExperience] = useState<string>('');
  // eslint-disable-next-line
  const [telephone, setTelephone] = useState<string>('');

  useEffect(() => {
    let tmp = '';
    for (let i = 0; i < profile.experience; i++) {
      tmp += '★';
    }
    for (let i = profile.experience; i < 5; i++) {
      tmp += '☆';
    }
    setExperience(tmp);
  }, [profileData, profile.experience]);

  useEffect(() => {
    let result = '';
    const tmp = profileData.telephone.split('');

    result = '+' + tmp[0] + tmp[1] + ' ' + tmp[2] + tmp[3] + tmp[4] + ' ' + tmp[5] + tmp[6] + tmp[7] + ' ' + tmp[8] + tmp[9] + tmp[10];
    setTelephone(result);
  }, [profileData.telephone]);

  const getLanguage = (code: string) => {
    switch (code) {
      case 'PL':
        return t('Polish');
      case 'EN':
        return t('English');
      case 'DE':
        return t('German');
    }
  };

  const getCountry = (code: string) => {
    switch (code) {
      case 'PL':
        return t('Poland');
      case 'EN':
        return t('England');
      case 'DE':
        return t('Germany');
    }
  };

  return (
    <Grid container className={classes.root} alignItems='center'>
      <Grid container justify='center' alignItems='center' xs={12} sm={12}>
        <Avatar className={classes.avatar} src={profile.avatar} alt='' />
      </Grid>
      <Grid container xs={12} sm={12} className={classes.mainInfo}>
        <Grid container justify='center' xs={12} sm={12}>
          <Typography variant='body1' className={classes.text}>
            {profile.firstName} {profile.lastName}
          </Typography>
        </Grid>
        <Grid container justify='center' xs={12} sm={12}>
          <Typography variant='body2'>
            ({profileData.age}, {t(profileData.gender)})
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: '1rem' }} sm={12} xs={12}>
        <Grid container justify='flex-end' xs={6} sm={6}>
          {getCountry(profileData.country)}
        </Grid>
        <Grid container justify='flex-start' xs={6} sm={6}>
          <img src={profileData.country === 'PL' ? poland : ''} alt='' className={classes.flag} />
        </Grid>
      </Grid>
      <div>
        <div>
          <p>{t('Experience')}:</p>
          <p>{experience}</p>
        </div>
        <div>
          <p>{t('Average mark')}:</p>
          <p>{profile.averageMark > 0 ? profile.averageMark : 0}</p>
        </div>
      </div>
      <div>
        <div>
          <p>{t('Languages')}:</p>
          <p>{profile.languages.map((lng: string) => `${getLanguage(lng)} `)}</p>
        </div>
      </div>
    </Grid>
  );
};

export default GuideProfileData;
